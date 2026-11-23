import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { GENAI_TOPICS } from './genaiTopics';

const AIGovernance: React.FC = () => <TopicArticle content={GENAI_TOPICS['governance']} />;

export default AIGovernance;
