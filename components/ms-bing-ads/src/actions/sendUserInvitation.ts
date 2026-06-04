import { action } from "@prismatic-io/spectral";

import {
  accountIdsInput,
  connectionInput,
  emailInput,
  firstNameInput,
  lastNameInput,
  lcidInput,
  roleIdInput,
  customerIdInput,
} from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API } from "../util";
import { sendUserInvitationExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "SendUserInvitation";

export interface SendUserInvitationResponse {
  UserInvitationId: number;
}

export const sendUserInvitation = action({
  display: {
    label: "Send User Invitation",
    description:
      "Sends an email invitation for a user to sign up for Microsoft Advertising. The invitation limits account access and permissions.",
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
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: {
    accountIds: accountIdsInput,
    connection: connectionInput,
    customerId: {
      ...customerIdInput,
      required: true,
      comments:
        "The identifier of the customer this user is invited to manage. The AccountIds element determines which customer accounts the user can manage.",
    },
    email: emailInput,
    firstName: firstNameInput,
    lastName: lastNameInput,
    lcid: lcidInput,
    roleId: roleIdInput,
  },
  examplePayload: {
    data: sendUserInvitationExamplePayload,
  },
});
