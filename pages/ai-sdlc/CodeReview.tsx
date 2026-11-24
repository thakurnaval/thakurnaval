import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { AI_SDLC_TOPICS } from './aiSdlcTopics';

const CodeReview: React.FC = () => <TopicArticle content={AI_SDLC_TOPICS['code-review']} />;

export default CodeReview;
