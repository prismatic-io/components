import { action, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import {
  BINARY_CONTENT_TYPE,
  CONTENT_TYPE_HEADER,
  FORM_URLENCODED_CONTENT_TYPE,
  JSON_CONTENT_TYPE,
} from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import {
  getErrorMessage,
  handleArenaError,
  isRecord,
  keyValueListToRecord,
} from "../../util";
type ArenaRequestConfig = Parameters<
  Awaited<ReturnType<typeof createArenaClient>>["request"]
>[0];
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Make custom HTTP requests to the Arena API with full control over endpoint, method, payload, headers, and response handling. Useful for accessing endpoints not covered by specific actions.",
  },
  inputs: rawRequestInputs,
  examplePayload: rawRequestExamplePayload,
  perform: async (
    context,
    {
      connection,
      endpoint,
      httpMethod,
      jsonPayload,
      formData,
      fileData,
      queryParameters,
      additionalHeaders,
      responseType,
    },
  ) => {
    try {
      if (context.debug.enabled) {
        context.logger.debug("Raw request inputs received", {
          endpoint,
          httpMethod,
          jsonPayloadType: typeof jsonPayload,
          formDataType: typeof formData,
          formDataLength: Array.isArray(formData)
            ? formData.length
            : "not array",
          fileDataType: typeof fileData,
          queryParamsType: typeof queryParameters,
          queryParamsLength: Array.isArray(queryParameters)
            ? queryParameters.length
            : "not array",
          headersType: typeof additionalHeaders,
          headersLength: Array.isArray(additionalHeaders)
            ? additionalHeaders.length
            : "not array",
          responseType,
        });
      }
      const client = await createArenaClient(context, connection);
      if (/^([a-z][a-z\d+\-.]*:)?\/\//i.test(endpoint)) {
        throw new Error(
          `Endpoint must be a path relative to the Arena API base URL, received: ${endpoint}`,
        );
      }
      const normalizedEndpoint = endpoint.startsWith("/")
        ? endpoint
        : `/${endpoint}`;
      const queryParams = keyValueListToRecord(queryParameters);
      const headers = keyValueListToRecord(additionalHeaders);
      let requestBody: unknown;
      if (
        httpMethod.toUpperCase() !== "GET" &&
        httpMethod.toUpperCase() !== "DELETE"
      ) {
        if (fileData) {
          requestBody = fileData;
          if (!headers[CONTENT_TYPE_HEADER]) {
            headers[CONTENT_TYPE_HEADER] = BINARY_CONTENT_TYPE;
          }
        } else if (formData && Array.isArray(formData) && formData.length > 0) {
          const formDataObj = keyValueListToRecord(formData);
          if (Object.keys(formDataObj).length > 0) {
            requestBody = new URLSearchParams(formDataObj);
            headers[CONTENT_TYPE_HEADER] = FORM_URLENCODED_CONTENT_TYPE;
          }
        } else if (jsonPayload) {
          let parsedPayload: unknown;
          if (util.types.isString(jsonPayload)) {
            try {
              parsedPayload = JSON.parse(jsonPayload);
            } catch (error) {
              throw new Error(
                `Invalid JSON payload: ${getErrorMessage(error)}`,
              );
            }
          } else if (isRecord(jsonPayload)) {
            parsedPayload = jsonPayload;
          } else {
            throw new Error(
              `JSON payload must be a valid JSON string or object, received: ${typeof jsonPayload}`,
            );
          }
          requestBody = parsedPayload;
          if (!headers[CONTENT_TYPE_HEADER]) {
            headers[CONTENT_TYPE_HEADER] = JSON_CONTENT_TYPE;
          }
          if (context.debug.enabled) {
            context.logger.debug("JSON payload processed", {
              originalType: typeof jsonPayload,
              parsedType: typeof parsedPayload,
              parsedKeys: isRecord(parsedPayload)
                ? Object.keys(parsedPayload)
                : undefined,
            });
          }
        }
      }
      const requestConfig: ArenaRequestConfig = {
        url: normalizedEndpoint,
        method: httpMethod.toLowerCase(),
        ...(Object.keys(queryParams).length > 0 ? { params: queryParams } : {}),
        ...(Object.keys(headers).length > 0 ? { headers } : {}),
        ...(requestBody !== undefined ? { data: requestBody } : {}),
        ...(responseType && responseType !== "json"
          ? { responseType: responseType as ArenaRequestConfig["responseType"] }
          : {}),
      };
      context.logger.info("Making raw request to Arena API", {
        endpoint: normalizedEndpoint,
        method: httpMethod,
        hasPayload: !!(jsonPayload || formData || fileData),
        hasQueryParams: !!queryParameters,
        hasAdditionalHeaders: !!additionalHeaders,
        responseType: responseType || "json",
        queryParamNames: Object.keys(queryParams),
        headerNames: Object.keys(headers),
      });
      const response = await client.request(requestConfig);
      let responseData: unknown;
      switch (responseType) {
        case "text":
          responseData = response.data;
          break;
        case "buffer":
          responseData = {
            data: Buffer.from(response.data),
            contentType:
              response.headers["content-type"] || BINARY_CONTENT_TYPE,
          };
          break;
        case "stream":
          responseData = {
            data: response.data,
            contentType:
              response.headers["content-type"] || BINARY_CONTENT_TYPE,
          };
          break;
        case "json":
        default:
          responseData = response.data;
          break;
      }
      context.logger.info("Raw request completed successfully", {
        statusCode: response.status,
        responseSize: JSON.stringify(responseData).length,
        contentType: response.headers["content-type"],
      });
      return {
        data: {
          responseData,
          statusCode: response.status,
          headers: Object.fromEntries(
            Object.entries(response.headers).map(([key, value]) => [
              key,
              String(value),
            ]),
          ),
        },
      };
    } catch (error) {
      context.logger.error("Raw request failed", {
        endpoint: endpoint,
        method: httpMethod,
        error: error instanceof Error ? error.message : String(error),
      });
      handleArenaError(error, context.logger, "Raw Request");
    }
  },
});
