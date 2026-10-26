import { action, outputSchema } from "@prismatic-io/spectral";
import { getBaseUrl, parseReportUrl } from "../../util";
import { getClient } from "../../client";
import { getRaasReportExamplePayload } from "../../examplePayloads";
import { getRaasReportInputs } from "../../inputs";
import { getRaasReportOutputSchema } from "../../outputSchemas";
export const getRaasReport = action({
  display: {
    label: "Get RaaS Report",
    description:
      "Retrieves the output of a Workday custom report exposed as a web service (RaaS).",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, reportUrl, prompts, format }) => {
    const url = parseReportUrl(reportUrl, getBaseUrl(connection));
    for (const [key, value] of Object.entries(prompts ?? {})) {
      url.searchParams.set(key, String(value));
    }
    url.searchParams.set("format", format);
    const client = getClient(connection, context.debug.enabled, url.origin);
    const { data } = await client.get(
      url.href,
      format === "json"
        ? { responseType: "json" }
        : { responseType: "text", headers: { Accept: "*/*" } },
    );
    return { data };
  },
  examplePerform: async () => getRaasReportExamplePayload,
  inputs: getRaasReportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRaasReportOutputSchema,
  }),
  examplePayload: getRaasReportExamplePayload,
});
