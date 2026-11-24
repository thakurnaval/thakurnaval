import type { TopicContent } from '../../components/TopicArticle';
import { ARCHITECTURE_TOPICS_A } from './architectureTopicsA';
import { ARCHITECTURE_TOPICS_B } from './architectureTopicsB';

export const ARCHITECTURE_TOPICS: Record<string, TopicContent> = { ...ARCHITECTURE_TOPICS_A, ...ARCHITECTURE_TOPICS_B };
