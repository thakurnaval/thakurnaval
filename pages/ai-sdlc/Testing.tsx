import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { AI_SDLC_TOPICS } from './aiSdlcTopics';

const Testing: React.FC = () => <TopicArticle content={AI_SDLC_TOPICS['testing']} />;

export default Testing;
