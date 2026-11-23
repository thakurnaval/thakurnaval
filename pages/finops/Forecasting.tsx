import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { FINOPS_TOPICS } from './finopsTopics';

const Forecasting: React.FC = () => <TopicArticle content={FINOPS_TOPICS['forecasting']} />;

export default Forecasting;
