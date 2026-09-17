import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { createGenericPipelineInputs } from "../../inputs";
import { createGenericPipelineExamplePayload } from "../../examplePayloads";
import { getFallbackConnectionToken, validateConnection } from "../../util";
export const createGenericPipeline = action({
  display: {
    label: "Create Generic Pipeline",
    description: "This request creates an export pipeline.",
  },
  inputs: createGenericPipelineInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, dataAndDomain, ...params }) => {
    validateConnection(connection);
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
  }> => createGenericPipelineExamplePayload,
  examplePayload: createGenericPipelineExamplePayload,
});
