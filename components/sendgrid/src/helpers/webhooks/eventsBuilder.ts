import type { TrackEvents } from "../../types";

export const eventsBuilder = (events: string[]): TrackEvents => {
  const trackEvents: TrackEvents = {
    delivered: false,
    bounce: false,
    deferred: false,
    processed: false,
    dropped: false,
    open: false,
    click: false,
    spamReport: false,
    unsubscribe: false,
    groupUnsubscribe: false,
    groupResubscribe: false,
  };
  events.forEach((event) => {
    switch (event) {
      case "delivered":
        trackEvents.delivered = true;
        break;
      case "bounce":
        trackEvents.bounce = true;
        break;
      case "deferred":
        trackEvents.deferred = true;
        break;
      case "processed":
        trackEvents.processed = true;
        break;
      case "dropped":
        trackEvents.dropped = true;
        break;
      case "open":
        trackEvents.open = true;
        break;
      case "click":
        trackEvents.click = true;
        break;
      case "spamReport":
        trackEvents.spamReport = true;
        break;
      case "unsubscribe":
        trackEvents.unsubscribe = true;
        break;
      case "groupUnsubscribe":
        trackEvents.groupUnsubscribe = true;
        break;
      case "groupResubscribe":
        trackEvents.groupResubscribe = true;
        break;
    }
  });
  return trackEvents;
};
