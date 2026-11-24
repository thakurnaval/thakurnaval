import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { AI_SDLC_TOPICS } from './aiSdlcTopics';

const Monitoring: React.FC = () => <TopicArticle content={AI_SDLC_TOPICS['monitoring']} />;

export default Monitoring;
