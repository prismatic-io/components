import { dataSource, Element } from "@prismatic-io/spectral";
import { selectPhoneInputs } from "../inputs/selectPhoneInputs";
import { getClient } from "../client";

export const selectPhone = dataSource({
  display: {
    label: "Select Phone",
    description: "Select a phone number.",
  },
  inputs: selectPhoneInputs,
  perform: async (context, { connection, whatsappBusinessAccountId }) => {
    const client = getClient(connection, false);
    let allPhones: { id: string; display_phone_number: string }[] = [];

    let url = `/${whatsappBusinessAccountId}/phone_numbers`;

    while (url) {
      const response: {
        data: {
          data: { id: string; display_phone_number: string }[];
          paging?: { next?: string };
        };
      } = await client.get(url);

      allPhones = allPhones.concat(response.data.data);

      url = response.data.paging?.next ? response.data.paging.next : "";
    }

    const result = allPhones.map<Element>(({ id, display_phone_number }) => ({
      label: display_phone_number,
      key: id,
    }));

    return { result };
  },
  dataSourceType: "picklist",
});
