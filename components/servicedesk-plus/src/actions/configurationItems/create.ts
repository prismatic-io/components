import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getConfigurationItemResponse as createConfigurationItemResponse } from "../../examplePayloads";
import {
  attributes,
  ciTypeApiName,
  connectionInput,
  description,
  name,
} from "../../inputs";
import { createConfigurationItemPayload } from "../../util";

export const createConfigurationItem = action({
  display: {
    label: "Create Configuration Item",
    description: "Create a new configuration item on the CMDB",
  },
  inputs: {
    ciTypeApiName,
    name: {
      ...name,
      comments: "Indicates the unique name used to identify the CI",
      required: true,
    },
    description,
    attributes: {
      ...attributes,
      default: JSON.stringify(
        {
          txt_ip_address: "127.0.0.1",
        },
        null,
        2,
      ),
    },
    connectionInput,
  },
  perform: async (
    context,
    { connectionInput, ciTypeApiName, name, description, attributes },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const newConfigurationItem = {
      name,
      description,
      ci_attributes: { ...attributes },
    };
    const payload = createConfigurationItemPayload(
      ciTypeApiName as string,
      newConfigurationItem,
    );
    const { data } = await client.post(`/cmdb/${ciTypeApiName}`, payload);
    return { data };
  },
  examplePayload: {
    data: createConfigurationItemResponse,
  },
});
