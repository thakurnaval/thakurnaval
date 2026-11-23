import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const ThreatModelling: React.FC = () => <TopicArticle content={SECOPS_TOPICS['threat-modeling']} />;

export default ThreatModelling;
