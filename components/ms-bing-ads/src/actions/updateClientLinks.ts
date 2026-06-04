import { action } from "@prismatic-io/spectral";

import {
  clientEntityIdInput,
  connectionInput,
  managingCustomerIdInput,
  noteInput,
  statusInput,
} from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API, toArray } from "../util";
import { AddClientLinksResponse, OperationError } from "./addClientLinks";
import { updateClientLinksExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "UpdateClientLinks";

export type UpdateClientLinksResponse = AddClientLinksResponse;

export const updateClientLinks = action({
  display: {
    label: "Update Client Link",
    description: "Updates the status of the specified client link.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { clientEntityId, connection, managingCustomerId, note, status },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CUSTOMER_MANAGEMENT_API.WSDL,
    });

    const response = await sendAsync<UpdateClientLinksResponse>({
      debug,
      args: {
        'ClientLinks xmlns:v13e="https://bingads.microsoft.com/Customer/v13/Entities"':
          {
            "v13e:ClientLink": {
              "v13e:ClientEntityId": clientEntityId,
              "v13e:ManagingCustomerId": managingCustomerId,
              "v13e:Note": note,
              "v13e:Status": status,
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
    managingCustomerId: managingCustomerIdInput,
    note: noteInput,
    status: statusInput,
  },
  examplePayload: {
    data: updateClientLinksExamplePayload,
  },
});
