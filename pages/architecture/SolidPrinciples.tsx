import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const SolidPrinciples: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['solid-principles']} />;

export default SolidPrinciples;
