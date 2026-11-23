import 'fake-indexeddb/auto';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { initI18n } from './i18n/index.ts';

initI18n('en');
afterEach(() => cleanup());
