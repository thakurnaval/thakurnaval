import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { AI_SDLC_TOPICS } from './aiSdlcTopics';

const Requirements: React.FC = () => <TopicArticle content={AI_SDLC_TOPICS['requirements']} />;

export default Requirements;
