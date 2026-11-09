import { loggerMock } from "@prismatic-io/spectral/testing";
import { MAX_CONSECUTIVE_POLLING_ERRORS } from "../../constants";
import { handlePollingError } from "./handlePollingError";

const httpError = Object.assign(
  new Error("Request failed with status code 429"),
  {
    isAxiosError: true,
    response: {
      status: 429,
      headers: { "request-id": "AbCdEfGhIjKlMnOpQrStUv" },
      data: {
        error: {
          details: [
            {
              errors: [
                {
                  errorCode: { quotaError: "RESOURCE_EXHAUSTED" },
                  message: "The daily operation limit was reached.",
                },
              ],
            },
          ],
        },
      },
    },
  },
);

const pollingContext = () => {
  const logger = loggerMock();
  const setState = vi.fn();
  return {
    logger,
    setState,
    context: { logger, polling: { setState } } as never,
  };
};

describe("handlePollingError", () => {
  test("records the failure and rethrows", () => {
    const { context, setState, logger } = pollingContext();

    expect(() =>
      handlePollingError(
        httpError,
        { errorCount: 0, consecutiveErrors: 0 },
        context,
        "Google Ads",
      ),
    ).toThrow(httpError);
    expect(setState).toHaveBeenCalledWith({
      errorCount: 1,
      consecutiveErrors: 1,
    });
    expect(logger.error).not.toHaveBeenCalled();
  });

  test("logs the Google Ads error detail once the streak hits the limit", () => {
    const { context, logger } = pollingContext();

    expect(() =>
      handlePollingError(
        httpError,
        {
          errorCount: 5,
          consecutiveErrors: MAX_CONSECUTIVE_POLLING_ERRORS - 1,
        },
        context,
        "Google Ads",
      ),
    ).toThrow(httpError);
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        "RESOURCE_EXHAUSTED: The daily operation limit was reached. (request-id: AbCdEfGhIjKlMnOpQrStUv)",
      ),
    );
  });
});
