import { handleErrors as handleHttpClientErrors } from "@prismatic-io/spectral/dist/clients/http";
import type { RequestError as UpstreamRequestError } from "dynamics-web-api";



interface RequestError extends UpstreamRequestError {
  statusMessage?: string;
}

const isRequestError = (val: unknown): val is RequestError =>
  val && typeof val === "object" && "status" in val;



export const handleErrors = (error: unknown): unknown => {
  if (isRequestError(error)) {
    if (!error.message) {
      const errorParts = [];
      if (error.status) {
        errorParts.push(`Status: ${error.status}`);
      }
      if (error.statusText) {
        errorParts.push(`Status Text: ${error.statusText}`);
      }
      if (error.statusMessage) {
        errorParts.push(`Status Message: ${error.statusMessage}`);
      }
      if (error.innererror) {
        if (error.innererror.message) {
          errorParts.push(`Inner Error Message: ${error.innererror.message}`);
        }
        if (error.innererror.type) {
          errorParts.push(`Inner Error Type: ${error.innererror.type}`);
        }
        if (error.innererror.stacktrace) {
          errorParts.push(`Inner Error Stacktrace: ${error.innererror.stacktrace}`);
        }
      }

      return new Error(
        errorParts.length ? errorParts.join("\n") : "An unknown MS Dynamics 365 API error occurred."
      );
    }
  }
  return handleHttpClientErrors(error);
};
