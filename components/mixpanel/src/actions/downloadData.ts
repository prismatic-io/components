import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../client";
import {
  connectionInput,
  dataAndDomain,
  project_id,
  from_date,
  to_date,
  limit,
  where,
  event,
  gzipEncoding,
} from "../inputs";
import { Authorization } from "../enums/Authorization";
import { downloadDataExamplePayload } from "../examplePayloads";

export const downloadData = action({
  display: {
    label: "Download Data",
    description:
      "Download your event data as it is received and stored within Mixpanel.",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    from_date,
    to_date,
    project_id,
    limit,
    event,
    where: {
      ...where,
      comments:
        "An expression to filter events by. More info on expression sequence structure can be found here: https://developer.mixpanel.com/reference/segmentation-expressions",
    },
    gzipEncoding,
  },
  perform: async (
    context,
    {
      connection,
      dataAndDomain,
      from_date,
      to_date,
      project_id,
      limit,
      event,
      where,
      gzipEncoding,
    },
  ) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.get("/export", {
      params: {
        from_date: from_date || undefined,
        to_date: to_date || undefined,
        project_id: project_id || undefined,
        limit: limit || undefined,
        event: event || undefined,
        where: where || undefined,
      },
      headers: {
        "Accept-Encoding": gzipEncoding ? "gzip" : undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: downloadDataExamplePayload,
});
