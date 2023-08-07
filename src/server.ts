import { notFoundErrorHandler, logError } from './middlewares/errorHandler';
import {
  IServerInitializationContract, IUtilitiesContract,
} from './shared/interfaces';

/** Models */

/** DALs */

/** Services */
import ssmlProcessorService from './components/ssml-processor/services/ssmlProcessorService';

/** Controllers */
import ssmlProcessorController from './components/ssml-processor/controllers/ssmlProcessorController';

/** Routers */
import ssmlProcessorRouter from './components/ssml-processor/router';

/** Utilities */
import Response from './libs/response';
import LRUCache from './libs/lru-cache';
import SSMLParser from './libs/ssml-parcer';

const ServerInitialization = ({
  utilities,
}: {
  utilities: IUtilitiesContract;
}): IServerInitializationContract => ({
  startServer: async ({
    expressApplication,
    port,
    logger,
    environment,
  }) => {
    try {
      const normalizedPort = utilities.normalizePort(port);
      const cache = new Map();
      const MAX_SIZE = 5;

      if (!normalizedPort) {
        throw new Error('Invalid port');
      } else {
        /** Utilities */
        const responseFormat = Response();
        const lruCache = LRUCache(cache, MAX_SIZE);
        const ssmlParser = SSMLParser();

        /** Services initialization */
        const ssmlProcessor = ssmlProcessorService({ ssmlParser, lruCache });

        /** Controllers initialization */
        const ssmlController = ssmlProcessorController({
          responseFormat,
          ssmlProcessorService: ssmlProcessor,
        });

        /** Routes */
        const ssmlRoutes = ssmlProcessorRouter({
          ssmlProcessorController: ssmlController,
        });

        expressApplication.use('/api', ssmlRoutes);

        /** Not Found Error Handler */
        expressApplication.use(notFoundErrorHandler);

        /** Error Handler - Logger */
        expressApplication.use(logError);

        expressApplication.listen(normalizedPort, () => {
          logger.info(`Environment ${environment}`);
          logger.info(`Server running on http://localhost:${port}`);
        });

        utilities.compressLogs(`system-${new Date().getTime()}`, 'system');
      }
    } catch (error) {
      process.on('uncaughtException', () => utilities.handlerFatalException);
      process.on('unhandledRejection', () => utilities.handlerFatalException);
    }
  },
});

export default ServerInitialization;
