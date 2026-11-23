import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const SRE: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['sre']} />;

export default SRE;
