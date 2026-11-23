import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const PlatformEngineering: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['platform-engineering']} />;

export default PlatformEngineering;
