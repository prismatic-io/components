import { action } from "@prismatic-io/spectral";
import { getConfigurationItemAttributesExamplePayload } from "../../../examplePayloads";
import { getConfigurationItemAttributesInputs } from "../../../inputs";
import { createNowApiClient } from "../../../util";
export const getConfigurationItemAttributes = action({
  display: {
    label: "Get Configuration Item Attributes",
    description:
      "Returns attributes and relationship information for a specified configuration item (CI) record.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { apiVersionInput, connection, instanceUrlInput, className, sysId },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    const { data } = await client.get(`/cmdb/instance/${className}/${sysId}`);
    return {
      data,
    };
  },
  examplePayload: getConfigurationItemAttributesExamplePayload,
  inputs: getConfigurationItemAttributesInputs,
});
