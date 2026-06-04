import { action } from "@prismatic-io/spectral";

import {
  clientEntityIdInput,
  connectionInput,
  customerLinkPermissionInput,
  inviterEmailInput,
  inviterNameInput,
  inviterPhoneInput,
  isBillToClientInput,
  managingCustomerIdInput,
  nameInput,
  noteInput,
  suppressNotificationInput,
  typeInput,
} from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import { addClientLinksExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "AddClientLinks";

export interface OperationError {
  Code: number;
  Details: string;
  Message: string;
}

export interface AddClientLinksResponse {
  OperationErrors: {
    OperationError: OperationError | OperationError[];
  };
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: OperationError | OperationError[];
    };
  };
}

export const addClientLinks = action({
  display: {
    label: "Add Client Link",
    description:
      "Initiates the client link process to manage the accounts of another customer. Sends a link request from one customer to another customer or account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      clientEntityId,
      connection,
      customerLinkPermission,
      inviterEmail,
      inviterName,
      inviterPhone,
      isBillToClient,
      managingCustomerId,
      name,
      note,
      suppressNotification,
      type,
    },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<AddClientLinksResponse>({
      debug,
      args: {
        'ClientLinks xmlns:v13e="https://bingads.microsoft.com/Customer/v13/Entities"':
          {
            "v13e:ClientLink": {
              "v13e:Type": type,
              "v13e:ClientEntityId": clientEntityId,
              "v13e:ManagingCustomerId": managingCustomerId,
              "v13e:Note": note,
              "v13e:Name": name,
              "v13e:InviterEmail": inviterEmail,
              "v13e:InviterName": inviterName,
              "v13e:InviterPhone": inviterPhone,
              "v13e:IsBillToClient": isBillToClient,
              "v13e:SuppressNotification": suppressNotification,
              "v13e:CustomerLinkPermission": customerLinkPermission,
            },
          },
      },
      client,
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CUSTOMER_MANAGEMENT_API.TN,
    });

    return {
      data:
        response?.OperationErrors?.OperationError ||
        response?.PartialErrors?.ArrayOfOperationError?.OperationError
          ? {
              OperationErrors: {
                OperationError: toArray<OperationError>(
                  response?.OperationErrors?.OperationError,
                ),
              },
              PartialErrors: {
                ArrayOfOperationError: {
                  OperationError: toArray<OperationError>(
                    response?.PartialErrors?.ArrayOfOperationError
                      ?.OperationError,
                  ),
                },
              },
            }
          : response,
    };
  },
  inputs: {
    clientEntityId: clientEntityIdInput,
    connection: connectionInput,
    customerLinkPermission: customerLinkPermissionInput,
    inviterEmail: inviterEmailInput,
    inviterName: inviterNameInput,
    inviterPhone: inviterPhoneInput,
    isBillToClient: isBillToClientInput,
    managingCustomerId: managingCustomerIdInput,
    name: nameInput,
    note: noteInput,
    suppressNotification: suppressNotificationInput,
    type: typeInput,
  },
  examplePayload: {
    data: addClientLinksExamplePayload,
  },
});
