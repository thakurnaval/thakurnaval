import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const SecOpsPractices: React.FC = () => <TopicArticle content={SECOPS_TOPICS['practices']} />;

export default SecOpsPractices;
