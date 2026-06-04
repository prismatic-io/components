import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getDataChangesByIdExamplePayload } from "../../examplePayloads";
import { getDataChangesByIdInputs } from "../../inputs";

export const getDataChangesById = action({
  display: {
    label: "Get Data Change by ID",
    description:
      "Data change is a Prism artifact that gives users the ability to easily load data into a Prism table so that they can use the table for analysis in downstream applications (Discovery Board, Reports, apps like Accounting Center/People Analytics) Data from multiple sources.",
  },
  perform: async (context, { connection, tenant, dataChangeId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.prismAnalytics}/${tenant}/dataChanges/${dataChangeId}`,
    );
    return {
      data,
    };
  },
  inputs: getDataChangesByIdInputs,
  examplePayload: getDataChangesByIdExamplePayload,
});
