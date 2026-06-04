import { action } from "@prismatic-io/spectral";
import { listAgreementsInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { AgreementResponse } from "../../types";
import { fetchAdobeSignResults } from "../../util";
import { listAgreementsExamplePayload } from "../../examplePayloads";

export const listAgreements = action({
  display: {
    label: "List Agreements",
    description: "Retrieves agreements for the user.",
  },
  inputs: listAgreementsInputs,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      cursor,
      pageSize,
      externalId,
      groupId,
      showHiddenAgreements,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const data = await fetchAdobeSignResults<
      AgreementResponse,
      "userAgreementList",
      typeof fetchAll
    >(
      client,
      "/agreements",
      fetchAll,
      {
        pageSize: pageSize || undefined,
        cursor: cursor || undefined,
        externalId: externalId || undefined,
        groupId: groupId || undefined,
        showHiddenAgreements: showHiddenAgreements || undefined,
      },
      "userAgreementList",
    );

    return { data };
  },
  examplePayload: listAgreementsExamplePayload,
});
