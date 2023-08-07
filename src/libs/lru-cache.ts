import { ILRUCacheContract } from '../shared/interfaces';

const LRUCache = (cache: Map<string, any>, cacheSize: number): ILRUCacheContract => ({
  set: (key: string, storeValue: Record<string, any>) => {
    if (cache.has(key)) {
      return cache.get(key);
    }

    if (cache.size >= cacheSize) {
      const oldestKey = cache.keys().next().value;
      cache.delete(oldestKey);
    }

    cache.set(key, storeValue);
    return null;
  },
  get: (key: string) => {
    if (cache.has(key)) {
      return cache.get(key);
    }

    return null;
  },
});

export default LRUCache;
