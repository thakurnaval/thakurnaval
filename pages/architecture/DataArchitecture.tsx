import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const DataArchitecture: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['data-architecture']} />;

export default DataArchitecture;
