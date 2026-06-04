import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, phoneNumber } from "../../inputs";

export const listReferencesToAPhoneNumber = action({
  display: {
    label: "List References to a Phone Number",
    description:
      "Shows the elements in the Gong system that reference the given phone number.",
  },
  perform: async (context, { connection, phoneNumber }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/v2/data-privacy/data-for-phone-number`,
      {
        params: { phoneNumber: encodeURIComponent(phoneNumber) },
      },
    );
    return { data };
  },
  inputs: {
    connection,
    phoneNumber,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      emails: [
        {
          from: "test@test.com",
          id: "223mjfaaqqjuegabiyrmpctvcwwl75oz",
          sentTime: "2019-01-20T00:00:00-08:00",
          mailbox: "test@test.com",
          messageHash: "l3z7w2s7oircdabnkwizmycm6g2uwznc",
        },
      ],
      calls: [
        {
          id: "7782342274025937895",
          status: "COMPLETED",
          externalSystems: [
            {
              system: "Salesforce",
              objects: [
                {
                  objectType: "Task",
                  externalId: "0013601230sV7grAAC",
                },
              ],
            },
          ],
        },
      ],
      meetings: [
        {
          id: "8059707022269524529.sb5gr1tgpt5dd799eh035rb3dk@google.com_2022-06-30T13:00:00Z",
        },
      ],
      customerData: [
        {
          system: "Salesforce",
          objects: [
            {
              id: "7782342274025937895",
              objectType: "Contact",
              externalId: "0013601230sV7grAAC",
              mirrorId:
                '"{\\"integrationId\\":\\"262834820328732\\",\\"crmObjectType\\":\\"CONTACT\\",\\"crmId\\":\\"0031Q00002DFhi4QAD\\"}"',
              fields: [
                {
                  name: "name",
                  value: "Gong Inc.",
                },
              ],
            },
          ],
        },
      ],
      customerEngagement: [
        {
          eventType: "ExternalCallViewing",
          timestamp: 1547971200,
          contentId: "7782342274025937895",
          contentUrl:
            "https://app.gong.io/e/c-share/tkn=5vjaxkqnzmp515b220vlzto2i",
          reportingSystem:
            "https://app.gong.io/e/c-share/tkn=5vjaxkqnzmp515b220vlzto2i",
          eventName:
            "https://app.gong.io/e/c-share/tkn=5vjaxkqnzmp515b220vlzto2i",
          sourceEventId:
            "https://app.gong.io/e/c-share/tkn=5vjaxkqnzmp515b220vlzto2i",
        },
      ],
    },
  },
});
