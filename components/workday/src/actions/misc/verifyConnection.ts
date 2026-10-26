import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { verifyConnectionExamplePayload } from "../../examplePayloads";
import { verifyConnectionInputs } from "../../inputs";
import type { RaasReportResponse } from "../../types";
import {
  getAccessToken,
  getBaseUrl,
  parseReportUrl,
  usesRefreshToken,
} from "../../util";
export const verifyConnection = action({
  display: {
    label: "Verify Connection",
    description:
      "Verifies the connection by requesting a new access token and, optionally, reading a report.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, reportUrl }) => {
    const tokenExchanged = usesRefreshToken(connection);
    if (tokenExchanged) {
      await getAccessToken(connection, { forceRefresh: true });
    }
    if (!reportUrl) {
      return { data: { tokenExchanged, reportRead: false } };
    }
    const url = parseReportUrl(reportUrl, getBaseUrl(connection));
    url.searchParams.set("format", "json");
    const client = getClient(connection, context.debug.enabled, url.origin);
    const { data } = await client.get<RaasReportResponse>(url.href);
    return {
      data: {
        tokenExchanged,
        reportRead: true,
        reportEntryCount: data.Report_Entry?.length ?? 0,
      },
    };
  },
  examplePerform: async () => verifyConnectionExamplePayload,
  inputs: verifyConnectionInputs,
  examplePayload: verifyConnectionExamplePayload,
});
