import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const TwelveFactor: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['twelve-factor']} />;

export default TwelveFactor;
