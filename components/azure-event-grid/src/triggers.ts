import { trigger } from "@prismatic-io/spectral";
import { BRANCH_NAMES, VALIDATION_EVENT_TYPE } from "./constants";
import { eventTopics } from "./inputs/general";















interface EventGridEvent {
  id: string;
  topic: string;
  subject: string;
  data: {
    validationCode: string;
    validationUrl: string;
  };
  eventType?: string;
  type?: string;
  eventTime: string;
  metadataVersion: string;
  dataVersion: string;
}
type Events = EventGridEvent[];

function filterEvents(
  supportedEvents: string[],
  receivedEvent: string,
): boolean {
  return supportedEvents.includes(receivedEvent);
}

export const myTrigger = trigger({
  display: {
    label: "Event Grid Trigger",
    description: "Handle validation and delivery of Event Grid events",
  },
  perform: async (_context, payload, { eventTopics }) => {
    const responsePayload = {
      ValidationResponse: "",
    };
    let branchToReturn = BRANCH_NAMES.PROCESS_EVENT;

    const body = payload.body;
    const contentType = body.contentType;
    const events =
      contentType === "application/cloudevents+json; charset=utf-8"
        ? ([
            JSON.parse((body.data as Buffer).toString("utf-8")),
          ] as unknown as Events)
        : (body.data as Events);
    const requestHeaders = payload.headers;
    let responseHeaders = {};

    
    if (!events) {
      responseHeaders = {
        "WebHook-Allowed-Origin":
          requestHeaders["WebHook-Request-Origin"] || "*",
        "WebHook-Allowed-Rate": "100",
        Allow: "GET, POST, HEAD, OPTIONS",
      };
      return Promise.resolve({
        payload,
        branch: BRANCH_NAMES.VALIDATION_EVENT,
        response: {
          headers: responseHeaders,
          statusCode: 200,
          contentType: "application/json",
          body: "",
        },
      });
    }
    const supportedEvents = [...eventTopics, VALIDATION_EVENT_TYPE];
    const receivedEventType = events[0].eventType || events[0].type || "";

    
    if (!filterEvents(supportedEvents, receivedEventType)) {
      return Promise.resolve({
        payload,
        branch: BRANCH_NAMES.SKIP_EVENT,
        response: {
          headers: {},
          statusCode: 200,
          contentType: "application/json",
          body: "",
        },
      });
    }

    for (const event of events) {
      if (event.eventType === VALIDATION_EVENT_TYPE) {
        branchToReturn = BRANCH_NAMES.VALIDATION_EVENT;
        responseHeaders = {
          "WebHook-Allowed-Origin":
            requestHeaders["WebHook-Request-Origin"] || "*",
        };
        responsePayload.ValidationResponse = event.data.validationCode;
        break;
      }
    }

    if (branchToReturn === BRANCH_NAMES.PROCESS_EVENT) {
      return Promise.resolve({
        payload,
        branch: branchToReturn,
        response: {
          headers: responseHeaders,
          statusCode: 200,
          contentType: "application/json",
          body: JSON.stringify(events),
        },
      });
    }

    return Promise.resolve({
      payload,
      branch: branchToReturn,
      response: {
        headers: responseHeaders,
        statusCode: 200,
        contentType: "application/json",
        body: JSON.stringify(responsePayload),
      },
    });
  },
  inputs: {
    eventTopics,
  },
  synchronousResponseSupport: "valid",
  scheduleSupport: "invalid",
  allowsBranching: true,
  staticBranchNames: ["Process Event", "Skip Event", "Validation Event"],
});

export default { myTrigger };
