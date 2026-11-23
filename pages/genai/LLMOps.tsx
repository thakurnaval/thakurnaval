import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { GENAI_TOPICS } from './genaiTopics';

const LLMOps: React.FC = () => <TopicArticle content={GENAI_TOPICS['llmops']} />;

export default LLMOps;
