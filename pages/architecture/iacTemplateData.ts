/** Starter infrastructure-as-code templates offered on /architecture/iac-templates. */
export interface IacTemplate {
  id: string;
  title: string;
  tool: 'Terraform' | 'Bicep' | 'GitHub Actions';
  cloud: 'GCP' | 'Azure' | 'AWS' | 'Any';
  filename: string;
  summary: string;
  includes: string[];
  code: string;
}

export const IAC_TEMPLATES: IacTemplate[] = [
  {
    id: 'gcp-cloud-run',
    title: 'Cloud Run service with GitHub keyless deploys',
    tool: 'Terraform', cloud: 'GCP', filename: 'main.tf',
    summary: 'A container service that scales to zero, an Artifact Registry repo, and Workload Identity Federation so GitHub Actions deploys without a service-account key.',
    includes: ['Artifact Registry repository', 'Cloud Run v2 service, min 0 instances', 'Deploy service account with least-privilege roles', 'Workload Identity pool restricted to one GitHub repo'],
    code: `terraform {
  required_version = ">= 1.6"
  required_providers {
    google = { source = "hashicorp/google", version = "~> 6.0" }
  }
}

variable "project_id" { type = string }
variable "region" {
  type    = string
  default = "asia-southeast1"
}
variable "service_name" { type = string }
variable "github_repo" {
  type        = string
  description = "owner/repo allowed to deploy"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

data "google_project" "this" {}

resource "google_artifact_registry_repository" "images" {
  repository_id = var.service_name
  format        = "DOCKER"
  location      = var.region
}

resource "google_service_account" "deployer" {
  account_id   = "\${var.service_name}-deployer"
  display_name = "GitHub deployer for \${var.service_name}"
}

resource "google_project_iam_member" "deployer" {
  for_each = toset([
    "roles/run.admin",
    "roles/artifactregistry.writer",
    "roles/iam.serviceAccountUser",
  ])
  project = var.project_id
  role    = each.value
  member  = "serviceAccount:\${google_service_account.deployer.email}"
}

resource "google_iam_workload_identity_pool" "github" {
  workload_identity_pool_id = "github"
}

resource "google_iam_workload_identity_pool_provider" "github" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = "github"
  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
  }
  attribute_condition = "assertion.repository == '\${var.github_repo}'"
  oidc { issuer_uri = "https://token.actions.githubusercontent.com" }
}

resource "google_service_account_iam_member" "github_impersonation" {
  service_account_id = google_service_account.deployer.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/\${google_iam_workload_identity_pool.github.name}/attribute.repository/\${var.github_repo}"
}

resource "google_cloud_run_v2_service" "app" {
  name     = var.service_name
  location = var.region
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 5
    }
    containers {
      # Placeholder image; the pipeline deploys the real one.
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      resources {
        limits   = { cpu = "1", memory = "512Mi" }
        cpu_idle = true
      }
    }
  }

  lifecycle {
    ignore_changes = [template[0].containers[0].image]
  }
}

resource "google_cloud_run_v2_service_iam_member" "public" {
  name     = google_cloud_run_v2_service.app.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" { value = google_cloud_run_v2_service.app.uri }
output "workload_identity_provider" { value = google_iam_workload_identity_pool_provider.github.name }
output "deployer_email" { value = google_service_account.deployer.email }
`,
  },
  {
    id: 'azure-landing-zone',
    title: 'Azure workload baseline with enforced tags',
    tool: 'Terraform', cloud: 'Azure', filename: 'main.tf',
    summary: 'A resource group, virtual network, Log Analytics workspace and an Azure Policy assignment that denies resources missing your FinOps tags.',
    includes: ['Resource group and VNet with two subnets', 'Log Analytics workspace (30-day retention)', 'Mandatory tags applied to every resource', 'Built-in "Require a tag on resources" policy, one assignment per tag'],
    code: `terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 4.0" }
  }
}

# azurerm 4.x needs a subscription: set ARM_SUBSCRIPTION_ID or subscription_id below.
provider "azurerm" {
  features {}
}

variable "name" { type = string }
variable "location" {
  type    = string
  default = "centralindia"
}
variable "tags" {
  type        = map(string)
  description = "Must include owner, product, environment, cost-centre"
}

locals {
  required_tags = ["owner", "product", "environment", "cost-centre"]
}

resource "azurerm_resource_group" "this" {
  name     = "rg-\${var.name}"
  location = var.location
  tags     = var.tags
}

resource "azurerm_log_analytics_workspace" "this" {
  name                = "log-\${var.name}"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = var.tags
}

resource "azurerm_virtual_network" "this" {
  name                = "vnet-\${var.name}"
  location            = azurerm_resource_group.this.location
  resource_group_name = azurerm_resource_group.this.name
  address_space       = ["10.10.0.0/16"]
  tags                = var.tags
}

resource "azurerm_subnet" "app" {
  name                 = "snet-app"
  resource_group_name  = azurerm_resource_group.this.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = ["10.10.1.0/24"]
}

resource "azurerm_subnet" "data" {
  name                 = "snet-data"
  resource_group_name  = azurerm_resource_group.this.name
  virtual_network_name = azurerm_virtual_network.this.name
  address_prefixes     = ["10.10.2.0/24"]
}

# Built-in policy: "Require a tag on resources"
data "azurerm_policy_definition" "require_tag" {
  display_name = "Require a tag on resources"
}

resource "azurerm_resource_group_policy_assignment" "require_tags" {
  for_each             = toset(local.required_tags)
  name                 = "require-tag-\${each.value}"
  resource_group_id    = azurerm_resource_group.this.id
  policy_definition_id = data.azurerm_policy_definition.require_tag.id
  parameters           = jsonencode({ tagName = { value = each.value } })
}

output "resource_group" { value = azurerm_resource_group.this.name }
output "log_analytics_id" { value = azurerm_log_analytics_workspace.this.id }
`,
  },
  {
    id: 'aws-state-backend',
    title: 'Terraform remote state on AWS',
    tool: 'Terraform', cloud: 'AWS', filename: 'main.tf',
    summary: 'An encrypted, versioned S3 bucket for Terraform state with public access blocked, plus default tags on everything the provider creates.',
    includes: ['S3 bucket with versioning and encryption', 'All public access blocked; TLS-only bucket policy', 'Native S3 state locking (Terraform 1.10+), no DynamoDB table', 'Provider default_tags for FinOps'],
    code: `terraform {
  required_version = ">= 1.10"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

variable "region" {
  type    = string
  default = "ap-south-1"
}
variable "bucket_name" { type = string }
variable "owner" { type = string }

provider "aws" {
  region = var.region
  default_tags {
    tags = {
      owner       = var.owner
      product     = "platform"
      environment = "shared"
      managed-by  = "terraform"
    }
  }
}

resource "aws_s3_bucket" "state" {
  bucket = var.bucket_name
  lifecycle { prevent_destroy = true }
}

resource "aws_s3_bucket_versioning" "state" {
  bucket = aws_s3_bucket.state.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state" {
  bucket = aws_s3_bucket.state.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "aws:kms" }
  }
}

resource "aws_s3_bucket_public_access_block" "state" {
  bucket                  = aws_s3_bucket.state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

data "aws_iam_policy_document" "tls_only" {
  statement {
    sid     = "DenyInsecureTransport"
    effect  = "Deny"
    actions = ["s3:*"]
    resources = [aws_s3_bucket.state.arn, "\${aws_s3_bucket.state.arn}/*"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }
  }
}

resource "aws_s3_bucket_policy" "state" {
  bucket = aws_s3_bucket.state.id
  policy = data.aws_iam_policy_document.tls_only.json
}

# Then, in each workload:
# terraform {
#   backend "s3" {
#     bucket       = "<bucket_name>"
#     key          = "workloads/<name>/terraform.tfstate"
#     region       = "ap-south-1"
#     use_lockfile = true
#   }
# }
`,
  },
  {
    id: 'bicep-container-app',
    title: 'Azure Container App with managed identity',
    tool: 'Bicep', cloud: 'Azure', filename: 'main.bicep',
    summary: 'A Container Apps environment wired to Log Analytics and an app that scales to zero, using a system-assigned managed identity instead of secrets.',
    includes: ['Log Analytics workspace', 'Container Apps environment', 'Container App, 0–5 replicas, HTTP ingress', 'System-assigned managed identity; tags on every resource'],
    code: `@description('Short name used in resource names')
param name string

param location string = resourceGroup().location

@description('Container image, e.g. myregistry.azurecr.io/app:1.0.0')
param image string = 'mcr.microsoft.com/k8se/quickstart:latest'

param tags object = {
  owner: 'team-name'
  product: name
  environment: 'dev'
  'cost-centre': 'cc-000'
}

resource logs 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: 'log-\${name}'
  location: location
  tags: tags
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
  }
}

resource env 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: 'cae-\${name}'
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logs.properties.customerId
        sharedKey: logs.listKeys().primarySharedKey
      }
    }
  }
}

resource app 'Microsoft.App/containerApps@2024-03-01' = {
  name: 'ca-\${name}'
  location: location
  tags: tags
  identity: { type: 'SystemAssigned' }
  properties: {
    managedEnvironmentId: env.id
    configuration: {
      ingress: {
        external: true
        targetPort: 80
        transport: 'auto'
      }
    }
    template: {
      containers: [
        {
          name: name
          image: image
          resources: { cpu: json('0.5'), memory: '1Gi' }
        }
      ]
      scale: { minReplicas: 0, maxReplicas: 5 }
    }
  }
}

output url string = 'https://\${app.properties.configuration.ingress.fqdn}'
output principalId string = app.identity.principalId
`,
  },
  {
    id: 'gha-terraform-plan',
    title: 'Terraform plan on every pull request',
    tool: 'GitHub Actions', cloud: 'Any', filename: '.github/workflows/terraform-plan.yml',
    summary: 'Format, validate, security-scan and plan on each pull request, using OIDC (no stored cloud keys), with the plan posted as a PR comment.',
    includes: ['terraform fmt and validate', 'Checkov IaC security scan', 'terraform plan with keyless OIDC login (GCP example)', 'Plan summary as a PR comment'],
    code: `name: Terraform plan

on:
  pull_request:
    paths: ['infra/**']

permissions:
  contents: read
  id-token: write        # OIDC for keyless cloud login
  pull-requests: write   # post the plan as a comment

jobs:
  plan:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: infra
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.10.5

      - name: Format
        run: terraform fmt -check -recursive

      - name: Security scan (Checkov)
        uses: bridgecrewio/checkov-action@v12
        with:
          directory: infra
          framework: terraform
          soft_fail: false

      # Swap for azure/login@v2 or aws-actions/configure-aws-credentials@v4 on other clouds.
      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: \${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
          service_account: \${{ secrets.GCP_SA_EMAIL }}

      - name: Init and validate
        run: |
          terraform init -input=false
          terraform validate

      - name: Plan
        id: plan
        run: terraform plan -input=false -no-color -out=tfplan | tee plan.txt

      - name: Comment plan on PR
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const plan = fs.readFileSync('infra/plan.txt', 'utf8');
            const body = '### Terraform plan\\n\\n\`\`\`\\n' + plan.slice(-60000) + '\\n\`\`\`';
            await github.rest.issues.createComment({
              owner: context.repo.owner, repo: context.repo.repo,
              issue_number: context.issue.number, body,
            });
`,
  },
];
