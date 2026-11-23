import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const DevOpsMaturity: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['maturity']} />;

export default DevOpsMaturity;
