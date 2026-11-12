import { action, outputSchema } from "@prismatic-io/spectral";
import { updateAccountSignatureOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateAccountSignatureInputs } from "../../inputs";
import { updateAccountSignatureExamplePayload } from "../../examplePayloads";
import { cleanObject } from "../../util";

export const updateAccountSignature = action({
  display: {
    label: "Update Account Signature",
    description:
      "Updates an account stamp specified by the signatureId query parameter.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      dateAreaHeight,
      dateAreaWidth,
      dateAreaX,
      dateAreaY,
      disallowUserResizeStamp,
      externalID,
      imageType,
      isDefault,
      nrdsId,
      nrdsLastName,
      phoneticName,
      signatureFont,
      signatureId,
      signatureIdPath,
      signatureGroups,
      signatureInitials,
      signatureName,
      signatureType,
      signatureUsers,
      stampFormat,
      stampSizeMM,
    },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const body = cleanObject({
      dateStampProperties: {
        dateAreaHeight,
        dateAreaWidth,
        dateAreaX,
        dateAreaY,
      },
      disallowUserResizeStamp: disallowUserResizeStamp.toString(),
      externalID,
      imageType,
      isDefault: isDefault.toString(),
      nrdsId,
      nrdsLastName,
      phoneticName,
      signatureFont,
      signatureId,
      signatureGroups,
      signatureInitials,
      signatureName,
      signatureType,
      signatureUsers,
      stampFormat,
      stampSizeMM,
    });
    const { data } = await client.put(`/signatures/${signatureIdPath}`, body);
    return { data };
  },
  examplePerform: async () => updateAccountSignatureExamplePayload,
  inputs: updateAccountSignatureInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateAccountSignatureOutputSchema,
  }),
  examplePayload: updateAccountSignatureExamplePayload,
});
