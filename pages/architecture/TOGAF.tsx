import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const TOGAF: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['togaf']} />;

export default TOGAF;
