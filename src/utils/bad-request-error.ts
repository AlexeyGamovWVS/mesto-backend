import SERVER_STATUSES from "./server-statuses";

export default class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = SERVER_STATUSES.BAD_REQUEST;
  }
}
