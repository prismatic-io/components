import { dataSource } from "@prismatic-io/spectral";
import { $filter, connection } from "../inputs/general";
import { createClient } from "../client";
import { fetchAllData, mapPicklistArray, validateArray } from "../util";
import { businessPartnerDataSourceExamplePayload } from "../examplePayloads/datasources";

export const selectBusinessPartner = dataSource({
  display: {
    label: "Select Business Partner",
    description: "Select a Business Partner from a dropdown menu.",
  },
  inputs: {
    $filter,
    connection,
  },
  perform: async (context, { connection, $filter }) => {
    const CARD_CODE = "CardCode";
    const CARD_NAME = "CardName";
    const client = await createClient(connection, context, true);

    const data = await fetchAllData(
      client,
      "BusinessPartners",
      {
        $select: `${CARD_CODE}, ${CARD_NAME}`,
        $filter,
      },
      false,
      1000,
    );

    const array = validateArray(data);

    const objects = mapPicklistArray({
      data: array,
      keyName: CARD_CODE,
      keyLabel: CARD_NAME,
      orderKey: CARD_CODE,
    });

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: businessPartnerDataSourceExamplePayload,
});
