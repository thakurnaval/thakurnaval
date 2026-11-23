import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const CognitiveDevSecOps: React.FC = () => <TopicArticle content={SECOPS_TOPICS['cognitive-devsecops']} />;

export default CognitiveDevSecOps;
