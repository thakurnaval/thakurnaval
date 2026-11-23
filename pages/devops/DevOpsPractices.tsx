import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const DevOpsPractices: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['practices']} />;

export default DevOpsPractices;
