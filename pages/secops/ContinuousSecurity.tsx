import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const ContinuousSecurity: React.FC = () => <TopicArticle content={SECOPS_TOPICS['continuous-security']} />;

export default ContinuousSecurity;
