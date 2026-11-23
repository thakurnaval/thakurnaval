import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { DEVOPS_TOPICS } from './devopsTopics';

const DevOpsRoadmap: React.FC = () => <TopicArticle content={DEVOPS_TOPICS['roadmap']} />;

export default DevOpsRoadmap;
