import { ISSMLParserContract, ILRUCacheContract, ISSMLProcessorService } from '../../../shared/interfaces';

const ssmlProcessorService = ({
  ssmlParser,
  lruCache,
}: {
  ssmlParser: ISSMLParserContract;
  lruCache: ILRUCacheContract;
}): ISSMLProcessorService => ({
  process: async (ssmlText) => {
    const storedSSMLText = lruCache.get(ssmlText);

    if (storedSSMLText) {
      return storedSSMLText;
    }

    const ssmlParsed = await ssmlParser.parseSSML(ssmlText);
    lruCache.set(ssmlText, ssmlParsed);

    return ssmlParsed;
  },
});

export default ssmlProcessorService;
