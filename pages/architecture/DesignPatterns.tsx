import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const DesignPatterns: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['design-patterns']} />;

export default DesignPatterns;
