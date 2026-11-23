import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { FINOPS_TOPICS } from './finopsTopics';

const CostVisibility: React.FC = () => <TopicArticle content={FINOPS_TOPICS['cost-visibility']} />;

export default CostVisibility;
