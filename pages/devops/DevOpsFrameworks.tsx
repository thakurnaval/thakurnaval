import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const DevOpsFrameworks: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['frameworks']} />;

export default DevOpsFrameworks;
