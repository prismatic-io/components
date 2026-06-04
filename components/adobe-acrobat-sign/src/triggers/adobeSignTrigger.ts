import { trigger, util } from "@prismatic-io/spectral";
import { adobeSignTriggerInputs } from "../inputs";

export const adobeSignTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Adobe Acrobat Sign for manually configured webhook subscriptions.",
  },
  perform: async (_, payload, { connection, strictValidation }) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const clientId = headers["x-adobesign-clientid"];

    if (strictValidation) {
      if (connection.fields?.clientId !== clientId) {
        return Promise.resolve({
          payload,
          response: {
            statusCode: 401,
            contentType: "application/json",
          },
        });
      }
    }

    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "application/json",
        headers: {
          ["X-AdobeSign-ClientId"]: clientId,
        },
      },
    });
  },
  inputs: adobeSignTriggerInputs,
  
  
  
  
  
  

  
  
  

  
  
  
  
  
  

  
  
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
