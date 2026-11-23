import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { FINOPS_TOPICS } from './finopsTopics';

const UnitEconomics: React.FC = () => <TopicArticle content={FINOPS_TOPICS['unit-economics']} />;

export default UnitEconomics;
