import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { GENAI_TOPICS } from './genaiTopics';

const PromptEngineering: React.FC = () => <TopicArticle content={GENAI_TOPICS['prompt-engineering']} />;

export default PromptEngineering;
