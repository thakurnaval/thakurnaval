import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS } from './architectureTopics';

const SystemSecurity: React.FC = () => <TopicArticle content={ARCHITECTURE_TOPICS['system-security']} />;

export default SystemSecurity;
