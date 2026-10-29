import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { updateClientLinksExamplePayload } from "../../examplePayloads";
import { updateClientLinksInputs } from "../../inputs/clientLinks";
import type { OperationError, UpdateClientLinksResponse } from "../../types";
import { toArray } from "../../util";

export const updateClientLinks = action({
  display: {
    label: "Update Client Link",
    description:
      "Updates the status of the specified client link. Utilizes the SOAP API.",
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
      soapAction: SOAP_ACTION.UpdateClientLinks,
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
  inputs: updateClientLinksInputs,
  examplePayload: updateClientLinksExamplePayload,
});
