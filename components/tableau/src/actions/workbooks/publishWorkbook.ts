import { action, util } from "@prismatic-io/spectral";
import FormData from "form-data";
import { publishWorkbookExamplePayload } from "../../examplePayloads";
import { publishWorkbookInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const publishWorkbook = action({
  display: {
    label: "Publish Workbook",
    description: "Publish a workbook on the specified site.",
  },
  examplePayload: publishWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
      multipartMixed: true,
    });
    const queryParams = {
      ...(params.publishOptions.uploadSessionId && {
        uploadSessionId: params.publishOptions.uploadSessionId,
      }),
      ...(params.publishOptions.workbookType && {
        workbookType: params.publishOptions.workbookType,
      }),
      overwrite: params.publishOptions.overwrite,
      asJob: params.publishOptions.asJob,
      skipConnectionCheck: params.publishOptions.skipConnectionCheck,
    };
    const form = new FormData();
    form.append("request_payload", params.workbookXml, {
      filename: "publish-workbook.xml",
    });
    form.append("tableau_workbook", params.workbookFileContents.data, {
      filename: "workbook.twbx",
    });
    const response = await client.post("/workbooks", form.getBuffer(), {
      params: queryParams,
      headers: {
        "content-type": `multipart/mixed; boundary=${form.getBoundary()}`,
      },
      maxBodyLength: Number.POSITIVE_INFINITY,
    });
    return {
      data: response.data,
    };
  },
  inputs: publishWorkbookInputs,
});
