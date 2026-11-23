import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { GENAI_TOPICS } from './genaiTopics';

const GenAIFundamentals: React.FC = () => <TopicArticle content={GENAI_TOPICS['fundamentals']} />;

export default GenAIFundamentals;
