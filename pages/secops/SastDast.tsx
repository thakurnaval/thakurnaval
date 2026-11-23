import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const SastDast: React.FC = () => <TopicArticle content={SECOPS_TOPICS['sast-dast']} />;

export default SastDast;
