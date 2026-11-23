import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const DevSecOpsPractices: React.FC = () => <TopicArticle content={SECOPS_TOPICS['devsecops-practices']} />;

export default DevSecOpsPractices;
