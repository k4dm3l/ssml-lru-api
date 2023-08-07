import BaseError from './BaseError';
import ErrorEnum from '../enums/errors';

export default class BusinessError extends BaseError {
  public details?: Record<string, unknown> | undefined;

  public constructor(message: string, details?: Record<string, unknown>) {
    super(message);

    this.name = ErrorEnum.BUSINESS_ERROR;
    this.details = details || {};

    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}
