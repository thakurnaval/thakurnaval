import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const SecOpsAutomation: React.FC = () => <TopicArticle content={SECOPS_TOPICS['automation']} />;

export default SecOpsAutomation;
