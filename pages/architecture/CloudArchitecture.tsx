import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const CloudArchitecture: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['cloud-architecture']} />;

export default CloudArchitecture;
