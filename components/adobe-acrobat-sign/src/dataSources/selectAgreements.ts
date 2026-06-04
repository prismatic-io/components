import { dataSource } from "@prismatic-io/spectral";
import { selectAgreementsInputs } from "../inputs";
import { getAdobeSignClient } from "../client";
import type { AgreementResponse } from "../types";
import { fetchAdobeSignResults, filterAndSort } from "../util";

export const selectAgreements = dataSource({
  display: {
    label: "Select Agreements",
    description:
      "Retrieves a picklist of all agreements under this account, labeled as Name - Display Date.",
  },
  dataSourceType: "picklist",
  inputs: selectAgreementsInputs,
  perform: async (
    _,
    { connection, filterQuery, externalId, groupId, showHiddenAgreements },
  ) => {
    const client = getAdobeSignClient(connection);

    const agreements = await fetchAdobeSignResults<
      AgreementResponse,
      "userAgreementList",
      true
    >(
      client,
      "/agreements",
      true,
      {
        externalId: externalId || undefined,
        groupId: groupId || undefined,
        showHiddenAgreements,
      },
      "userAgreementList",
    );

    const elements = agreements.map((agreement) => ({
      label: `${agreement.name} - ${agreement.displayDate}`,
      key: agreement.id,
    }));

    return {
      result: filterAndSort(elements, filterQuery),
    };
  },
});
