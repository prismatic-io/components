import { action } from "@prismatic-io/spectral";
import { deleteConfigurationItemExamplePayload } from "../../../examplePayloads";
import { deleteConfigurationItemInputs } from "../../../inputs";
import { createNowApiClient } from "../../../util";
export const deleteConfigurationItem = action({
  display: {
    label: "Delete Configuration Item",
    description:
      "Deletes the relation for the specified configuration item (CI).",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      className,
      sysId,
      relSysId,
    },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    const { data } = await client.delete(
      `/cmdb/instance/${className}/${sysId}/relation/${relSysId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteConfigurationItemExamplePayload.data,
  }),
  inputs: deleteConfigurationItemInputs,
  examplePayload: deleteConfigurationItemExamplePayload,
});
