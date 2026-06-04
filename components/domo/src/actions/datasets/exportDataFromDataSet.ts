import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { datasetId, exportDataFromDataSetInputs } from "../../inputs";
import type { ExportDataFromDataSetQueryParams } from "../types/ExportDataFromDataSetQueryParams";
import { exportDataFromDataSetExamplePayload } from "../../examplePayloads";

export const exportDataFromDataSet = action({
  display: {
    label: "Export Data From DataSet",
    description: "Exports data from a DataSet in a Domo instance.",
  },
  examplePayload: exportDataFromDataSetExamplePayload,
  perform: async (context, { connection, fileName, includeHeader }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: ExportDataFromDataSetQueryParams = {};
    if (fileName.length) queryParams.fileName = fileName;
    if (includeHeader.length) queryParams.includeHeader = includeHeader;

    const { data } = await client.get(`/datasets/${datasetId}/data`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: exportDataFromDataSetInputs,
});

export default { exportDataFromDataSet };
