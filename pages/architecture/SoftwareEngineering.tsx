import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const SoftwareEngineering: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['software-engineering']} />;

export default SoftwareEngineering;
