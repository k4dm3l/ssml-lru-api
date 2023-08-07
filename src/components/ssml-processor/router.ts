import { Router, RequestHandler } from 'express';
import asyncHandler from '../../middlewares/asyncHandler';

const ssmlProcessorRouter = ({
  ssmlProcessorController,
}: {
  ssmlProcessorController: RequestHandler;
}): Router => {
  const router = Router();

  router.post(
    '/ssml',
    asyncHandler(ssmlProcessorController),
  );

  return router;
};

export default ssmlProcessorRouter;
