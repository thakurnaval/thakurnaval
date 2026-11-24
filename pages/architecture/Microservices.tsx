import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const Microservices: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['microservices']} />;

export default Microservices;
