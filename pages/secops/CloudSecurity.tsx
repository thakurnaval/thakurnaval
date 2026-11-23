import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const CloudSecurity: React.FC = () => <TopicArticle content={SECOPS_TOPICS['cloud-security']} />;

export default CloudSecurity;
