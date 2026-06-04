import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listReportSuiteDimensionsExamplePayload } from "../../examplePayloads";
import { listReportSuiteDimensionsInputs } from "../../inputs";
import type { ReportSuiteDimension } from "../../types";

export const listReportSuiteDimensions = action({
  display: {
    label: "List Dimensions for Report Suite",
    description: "Retrieves a list of dimensions for a given report suite.",
  },
  inputs: listReportSuiteDimensionsInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get<ReportSuiteDimension[]>(
      `https://analytics.adobe.io/api/${params.globalCompanyId}/dimensions`,
      { params: { rsid: params.reportSuiteId } },
    );
    return { data };
  },
  examplePayload: listReportSuiteDimensionsExamplePayload,
});
