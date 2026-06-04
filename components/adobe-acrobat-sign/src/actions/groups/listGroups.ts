import { action } from "@prismatic-io/spectral";
import { listGroupsInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { ListGroup } from "../../types";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { fetchAdobeSignResults } from "../../util";

export const listGroups = action({
  display: {
    label: "List Groups",
    description:
      "Retrieves a list of groups in the Adobe Acrobat Sign account.",
  },
  inputs: listGroupsInputs,
  perform: async (context, { connection, fetchAll, cursor, pageSize }) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const data = await fetchAdobeSignResults<
      ListGroup,
      "groupInfoList",
      typeof fetchAll
    >(
      client,
      "/groups",
      fetchAll,
      {
        pageSize: pageSize || undefined,
        cursor: cursor || undefined,
      },
      "groupInfoList",
    );

    return { data };
  },
  examplePayload: listGroupsExamplePayload,
});
