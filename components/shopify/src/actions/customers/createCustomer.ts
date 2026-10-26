import { action, outputSchema, util } from "@prismatic-io/spectral";
import {
  createCustomerPayload,
  customerExamplePayload,
} from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";
import { createCustomerOutputSchema } from "../../outputSchemas";
import type { RestAddress } from "../../types";
import { cleanArrayCodeInput, cleanValueListInput } from "../../util";
import { createCustomerGql } from "../graphql/customers/createCustomerGql";
import { addressMapper } from "../graphql/mappers/addressMapper";
export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Creates a new customer.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      firstName,
      lastName,
      email,
      shopifyConnection,
      tags,
      addressList,
      additionalFields = {},
    },
  ) => {
    const { data } = await createCustomerGql.perform(context, {
      shopifyConnection,
      firstName: util.types.toString(firstName),
      lastName: util.types.toString(lastName),
      email: util.types.toString(email),
      phone: additionalFields.phone,
      notes: util.types.toString(additionalFields.notes),
      metafields: cleanArrayCodeInput(
        additionalFields.metafields,
        "Metafields",
      ),
      tags: cleanValueListInput(tags),
      taxExempt: util.types.toBool(additionalFields.taxExempt),
      addressListGql: (
        cleanArrayCodeInput(addressList, "AddressList") as RestAddress[]
      ).map(addressMapper),
      additionalFields: {},
    });
    return { data };
  },
  inputs: createCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCustomerOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: customerExamplePayload,
  }),
  examplePayload: createCustomerPayload,
});
