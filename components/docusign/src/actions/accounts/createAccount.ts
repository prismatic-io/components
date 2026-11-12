import { action, outputSchema } from "@prismatic-io/spectral";
import { createAccountOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { createAccountInputs } from "../../inputs";
import { createAccountExamplePayload } from "../../examplePayloads";
import { cleanObject } from "../../util";

export const createAccount = action({
  display: {
    label: "Create Account",
    description: "Creates a new DocuSign account.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      accountName,
      address,
      connection,
      distributorCode,
      distributorPassword,
      fax,
      includedSeats,
      initialUser,
      phone,
      planId,
      referralCode,
      referrerName,
    },
  ) => {
    const client = await getDocuSignClient(
      connection,
      false,
      context.debug.enabled,
    );

    const accountRequest = cleanObject({
      accountName,
      distributorCode,
      distributorPassword,
      initialUser: {
        email: initialUser?.email,
        firstName: initialUser?.firstName,
        middleName: initialUser?.middleName,
        lastName: initialUser?.lastName,
        suffixName: initialUser?.suffixName,
        userName: initialUser?.userName,
        jobTitle: initialUser?.jobTitle,
        company: initialUser?.company,
      },
      addressInformation: {
        address1: address?.address1,
        address2: address?.address2,
        city: address?.city,
        state: address?.state,
        postalCode: address?.postalCode,
        country: address?.country,
        phone,
        fax,
      },
      planInformation: {
        planId,
      },
      referralInformation: {
        includedSeats,
        referralCode,
        referrerName,
      },
    });

    const body = {
      newAccountRequest: [accountRequest],
    };

    const { data } = await client.post(`/`, body);
    return { data };
  },
  examplePerform: async () => createAccountExamplePayload,
  inputs: createAccountInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAccountOutputSchema,
  }),
  examplePayload: createAccountExamplePayload,
});
