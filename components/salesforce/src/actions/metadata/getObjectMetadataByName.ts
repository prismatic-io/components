import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { getObjectMetadataByNameInputs } from "../../inputs";
import { getObjectMetadataExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const getObjectMetadataByName = action({
  display: {
    label: "Get Object Metadata",
    description: "Get the metadata of an object by full name.",
  },
  inputs: getObjectMetadataByNameInputs,
  perform: async (context, { connection, version, fullName, metadataType }) => {
    const salesforceClient = await createSalesforceClient(connection, version);

    const command = salesforceClient.metadata.read(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      metadataType,
      fullName,
    );
    const result = await executeSFAction(context, command);
    return { data: result };
  },
  examplePayload: getObjectMetadataExamplePayload as unknown,
});
