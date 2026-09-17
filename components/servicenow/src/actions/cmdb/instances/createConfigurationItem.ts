import { action } from "@prismatic-io/spectral";
import { createConfigurationItemExamplePayload } from "../../../examplePayloads";
import { createConfigurationItemInputs } from "../../../inputs";
import { createNowApiClient } from "../../../util";
export const createConfigurationItem = action({
  display: {
    label: "Create Configuration Item",
    description:
      "Creates a single configuration item (CI) with the specified outbound and inbound relations within the specified Configuration Management Database (CMDB) table.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      className,
      configurationItemAttributes,
      configurationItemInboundRelations,
      configurationItemOutboundRelations,
      configurationItemSource,
    },
  ) => {
    const client = createNowApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    const payload = {
      attributes: configurationItemAttributes,
      inbound_relations: configurationItemInboundRelations,
      outbound_relations: configurationItemOutboundRelations,
      source: configurationItemSource,
    };
    const { data } = await client.post(`/cmdb/instance/${className}`, payload);
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createConfigurationItemExamplePayload.data,
  }),
  inputs: createConfigurationItemInputs,
  examplePayload: createConfigurationItemExamplePayload,
});
