import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const DevOpsTools: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['tools']} />;

export default DevOpsTools;
