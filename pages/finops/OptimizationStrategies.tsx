import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { FINOPS_TOPICS } from './finopsTopics';

const OptimizationStrategies: React.FC = () => <TopicArticle content={FINOPS_TOPICS['optimization']} />;

export default OptimizationStrategies;
