import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const SecOpsPrinciples: React.FC = () => <TopicArticle content={SECOPS_TOPICS['principles']} />;

export default SecOpsPrinciples;
