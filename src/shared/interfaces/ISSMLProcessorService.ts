export interface ISSMLProcessorService {
  process: (ssmlText: string) => Promise<any>
}
