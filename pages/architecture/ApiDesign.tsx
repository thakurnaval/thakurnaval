import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const ApiDesign: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['api-design']} />;

export default ApiDesign;
