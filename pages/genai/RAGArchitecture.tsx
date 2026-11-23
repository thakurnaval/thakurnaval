import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { GENAI_TOPICS } from './genaiTopics';

const RAGArchitecture: React.FC = () => <TopicArticle content={GENAI_TOPICS['rag']} />;

export default RAGArchitecture;
