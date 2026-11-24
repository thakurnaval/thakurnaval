import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const ITGovernance: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['it-governance']} />;

export default ITGovernance;
