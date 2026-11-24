import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { AI_SDLC_TOPICS } from './aiSdlcTopics';

const Coding: React.FC = () => <TopicArticle content={AI_SDLC_TOPICS['coding']} />;

export default Coding;
