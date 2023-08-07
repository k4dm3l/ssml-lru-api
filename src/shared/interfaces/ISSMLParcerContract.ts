export interface ISSMLParserContract {
  parseSSML: (ssml: string) => Promise<Record<string, any>>
}
