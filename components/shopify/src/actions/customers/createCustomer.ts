import { action, util } from "@prismatic-io/spectral";
import { createCustomerInputs } from "../../inputs";
import { customerExamplePayload } from "../../payloadExamples";
import { cleanArrayCodeInput, cleanValueListInput } from "../../util";
import { createCustomerGql } from "../graphql/customers/createCustomer";
import { addressMapper } from "../graphql/mappers/addressMapper";
import type { RestAddress } from "../interfaces/RestAddress";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Creates a new customer.",
  },
  perform: async (
    context,
    {
      firstName,
      lastName,
      email,
      phone,
      notes,
      shopifyConnection,
      metafields,
      tags,
      taxExempt,
      addressList,
    },
  ) => {
    const { data } = await createCustomerGql.perform(context, {
      shopifyConnection,
      firstName: util.types.toString(firstName),
      lastName: util.types.toString(lastName),
      email: util.types.toString(email),
      phone,
      notes: util.types.toString(notes),
      metafields: cleanArrayCodeInput(metafields, "Metafields"),
      tags: cleanValueListInput(tags),
      taxExempt: util.types.toBool(taxExempt),
      addressListGql: (cleanArrayCodeInput(addressList, "AddressList") as RestAddress[]).map(
        addressMapper,
      ),
      additionalFields: {},
    });
    return { data };
  },
  inputs: createCustomerInputs,
  examplePayload: { data: customerExamplePayload },
});
