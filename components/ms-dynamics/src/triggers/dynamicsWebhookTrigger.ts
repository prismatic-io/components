import { trigger, util } from "@prismatic-io/spectral";
import { dynamicsWebhookTriggerExamplePayload } from "../examplePayloads";
import { dynamicsWebhookTriggerInputs } from "../inputs";

export const dynamicsWebhookTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Microsoft Dynamics 365 for manually configured webhook subscriptions.",
  },
  allowsBranching: true,
  staticBranchNames: ["URL Validation / Heartbeat", "Event"],
  examplePayload: dynamicsWebhookTriggerExamplePayload,
  perform: async (_context, payload, params) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);

    
    
    
    if (params.webhookKey) {
      const queryParameters = (payload.queryParameters ?? {}) as Record<string, unknown>;
      const providedKey = util.types.toString(
        queryParameters.code ?? queryParameters.Auth ?? queryParameters.auth
      );
      if (providedKey !== params.webhookKey) {
        throw new Error(
          "Webhook authentication failed: missing or invalid 'code' query parameter."
        );
      }
    }

    
    const requestId = headers["x-request-id"];
    const organization = headers["x-ms-dynamics-organization"];
    const entityName = headers["x-ms-dynamics-entity-name"];
    const requestName = headers["x-ms-dynamics-request-name"];

    if (requestName === "URL_VALIDATION") {
      return Promise.resolve({
        payload,
        response: { statusCode: 200, contentType: "text/plain" },
        branch: "URL Validation / Heartbeat",
      });
    }

    
    let bodyData: Record<string, unknown>;
    try {
      bodyData = JSON.parse(util.types.toString(payload.body.data));
    } catch (error) {
      throw new Error(`Failed to parse webhook request body as JSON: ${(error as Error).message}`);
    }

    const inputParameters = bodyData.InputParameters;
    const initiatingUserId = bodyData.InitiatingUserId;
    const messageName = bodyData.MessageName;

    return Promise.resolve({
      payload: {
        ...payload,
        bodyData,
        requestId,
        organization,
        entityName,
        inputParameters,
        initiatingUserId,
        messageName,
      },
      response: { statusCode: 200, contentType: "text/plain" },
      branch: "Event",
    });
  },
  inputs: dynamicsWebhookTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
