import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import { connection, userId, webinarType } from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { Webinar } from "../../interfaces/Webinar";
import { listWebinarsExamplePayload } from "../../examplePayloads";

export const listWebinars = action({
  display: {
    label: "List Webinars",
    description: "List all webinars for the given user",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, userId, type },
  ) => {
    const client = createZoomClient({ connection, debug });

    const data: { webinars: Webinar[] } =
      await getAllPaginationResults<Webinar>(
        client,
        `/users/${userId}/webinars`,
        "webinars",
        { type },
      );
    return {
      data,
    };
  },
  inputs: { connection, userId, type: webinarType },
  examplePayload: listWebinarsExamplePayload,
});
