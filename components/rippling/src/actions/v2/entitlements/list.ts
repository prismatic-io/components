import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listEntitlementsExamplePayload } from "../../../examplePayloads";
import { listEntitlementsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listEntitlements = action({
  display: {
    label: "List Entitlements (V2)",
    description: "Retrieve a list of entitlements.",
  },
  inputs: listEntitlementsInputs,
  examplePayload: listEntitlementsExamplePayload,
  perform: async (context, { connection, fetchAll, orderBy, cursor }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/entitlements", fetchAll, {
      order_by: orderBy,
      cursor,
    });
  },
});
