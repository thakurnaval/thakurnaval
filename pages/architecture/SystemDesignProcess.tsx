import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const SystemDesignProcess: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['system-design-process']} />;

export default SystemDesignProcess;
