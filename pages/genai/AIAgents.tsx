import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { GENAI_TOPICS } from './genaiTopics';

const AIAgents: React.FC = () => <TopicArticle content={GENAI_TOPICS['agents']} />;

export default AIAgents;
