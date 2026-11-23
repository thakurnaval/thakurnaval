import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { FINOPS_TOPICS } from './finopsTopics';

const FinOpsCulture: React.FC = () => <TopicArticle content={FINOPS_TOPICS['culture']} />;

export default FinOpsCulture;
