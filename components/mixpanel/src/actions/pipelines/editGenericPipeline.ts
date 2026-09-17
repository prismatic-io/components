import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { editGenericPipelineInputs } from "../../inputs";
import { editGenericPipelineExamplePayload } from "../../examplePayloads";
import { getFallbackConnectionToken } from "../../util";
export const editGenericPipeline = action({
  display: {
    label: "Edit Generic Pipeline",
    description: "This request edit the params for an export pipeline.",
  },
  inputs: editGenericPipelineInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, dataAndDomain, ...params }) => {
    const baseUrl = `https://${dataAndDomain}.mixpanel.com/api/2.0/`;
    const authorization = getFallbackConnectionToken(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...params, debugRequest: context.debug.enabled },
      {
        Authorization: authorization,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => editGenericPipelineExamplePayload,
  examplePayload: editGenericPipelineExamplePayload,
});
