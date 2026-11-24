import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const CodingStandards: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['coding-standards']} />;

export default CodingStandards;
