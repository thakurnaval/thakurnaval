import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const ChaosEngineering: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['chaos-engineering']} />;

export default ChaosEngineering;
