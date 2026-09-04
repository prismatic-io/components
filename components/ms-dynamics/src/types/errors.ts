import type { RequestError as UpstreamRequestError } from "dynamics-web-api";
export interface RequestError extends UpstreamRequestError {
  statusMessage?: string;
}
