import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { sendUserInvitationExamplePayload } from "../../examplePayloads";
import { sendUserInvitationInputs } from "../../inputs/users";
import type { SendUserInvitationResponse } from "../../types";

export const sendUserInvitation = action({
  display: {
    label: "Send User Invitation",
    description:
      "Sends an email invitation for a user to sign up for Microsoft Advertising. The invitation limits account access and permissions. Utilizes the SOAP API.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      accountIds,
      connection,
      customerId,
      email,
      firstName,
      lastName,
      lcid,
      roleId,
    },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<SendUserInvitationResponse>({
      debug,
      args: {
        'UserInvitation xmlns:v13e="https://bingads.microsoft.com/Customer/v13/Entities"':
          {
            "v13e:FirstName": firstName,
            "v13e:LastName": lastName,
            "v13e:Email": email,
            "v13e:CustomerId": customerId,
            "v13e:RoleId": roleId,
            ...(Array.isArray(accountIds) && accountIds.length
              ? {
                  'v13e:AccountIds xmlns:sa="http://schemas.microsoft.com/2003/10/Serialization/Arrays"':
                    accountIds.map((accountId) => ({
                      "sa:long": accountId,
                    })),
                }
              : {}),
            "v13e:Lcid": lcid,
          },
      },
      client,
      soapAction: SOAP_ACTION.SendUserInvitation,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: sendUserInvitationInputs,
  examplePayload: sendUserInvitationExamplePayload,
});
