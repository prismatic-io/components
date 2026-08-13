import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getVendorResponse as updateVendorResponse } from "../../examplePayloads/vendors";
import {
  code,
  connection,
  name,
  reactivate,
  subsidiaries,
  vendorId,
} from "../../inputs";
import { updateVendorOutputSchema } from "../../outputSchemas";
export const updateVendor = action({
  display: {
    label: "Update Vendor",
    description: "Update an existing vendor",
  },
  inputs: {
    vendorId: {
      ...vendorId,
      comments: "The ID of the vendor to update",
    },
    code,
    name,
    reactivate,
    subsidiaries,
    connection,
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateVendorOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, vendorId, code, name, reactivate, subsidiaries },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/accounting/vendors/${vendorId}`, {
      code,
      name,
      reactivate,
      subsidiaries,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { code, name },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateVendorResponse,
      code: code ?? updateVendorResponse.code,
      name: name ?? updateVendorResponse.name,
    },
  }),
  examplePayload: {
    data: updateVendorResponse,
  },
});
