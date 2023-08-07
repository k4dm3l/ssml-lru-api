import { RequestHandler, Request, Response } from 'express';
import { IResponseContract, ISSMLProcessorService } from '../../../shared/interfaces';

const ssmlProcessorController = ({
  ssmlProcessorService,
  responseFormat,
}: {
  ssmlProcessorService: ISSMLProcessorService;
  responseFormat: IResponseContract;
}): RequestHandler => async (
  request: Request,
  response: Response,
): Promise<void> => {
  const ssmlText = request.query.ssml as string;

  responseFormat.formatResponse({
    response,
    status: 200,
    data: {
      speak: await ssmlProcessorService.process(ssmlText),
    },
  });
};

export default ssmlProcessorController;
