import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClickUpClient as createClient } from "../client";
import { calendarsExamplePayload } from "../examplePayloads";
import { calendarsInputs } from "../inputs";
import type { Calendar, GetSpaceViewsResponse } from "../types";
export const calendars = dataSource({
  display: {
    label: "Select Calendar View",
    description: "Select a calendar view from a space.",
  },
  perform: async (_context, { spaceId, connection }) => {
    const client = createClient(connection);
    const { data } = await client.get<GetSpaceViewsResponse>(
      `/space/${spaceId}/view`,
      {
        params: {
          include_closed: false,
        },
      },
    );
    const calendarViews = data.views.filter(
      (view) =>
        view.type === "calendar" ||
        view.name.toLowerCase().includes("calendar"),
    );
    const options = calendarViews.map<Element>((view) => {
      return { label: view.name, key: view.id };
    });
    return { result: options };
  },
  inputs: calendarsInputs,
  examplePayload: calendarsExamplePayload,
  dataSourceType: "picklist",
});
