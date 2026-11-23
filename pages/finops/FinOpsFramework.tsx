import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { FINOPS_TOPICS } from './finopsTopics';

const FinOpsFramework: React.FC = () => <TopicArticle content={FINOPS_TOPICS['framework']} />;

export default FinOpsFramework;
