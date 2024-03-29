import SERVER_STATUSES from "./server-statuses";

export default class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = SERVER_STATUSES.NOT_FOUND;
  }
}
