export interface ILRUCacheContract {
  set: (key: string, storeValue: Record<string, any>) => Record<string, any> | null,
  get: (key: string) => Record<string, any> | null
}
