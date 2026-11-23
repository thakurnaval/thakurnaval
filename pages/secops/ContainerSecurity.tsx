import React from 'react';
import TopicArticle from '../../components/TopicArticle';
import { SECOPS_TOPICS } from './secopsTopics';

const ContainerSecurity: React.FC = () => <TopicArticle content={SECOPS_TOPICS['container-security']} />;

export default ContainerSecurity;
