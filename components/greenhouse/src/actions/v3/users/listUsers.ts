import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { listUsersV3ExamplePayload } from "../../../examplePayloads/v3/users";
import { listUsersV3Inputs } from "../../../inputs/v3/users";
import type { V3User } from "../../../types";
import { generatePayload, paginateV3 } from "../../../util";
export const listUsersV3 = action({
  display: {
    label: "List Users",
    description: "Retrieves a list of users.",
  },
  inputs: listUsersV3Inputs,
  perform: async (
    context,
    {
      connection,
      fetchAll: shouldFetchAll,
      pagination: { perPage: perPageVal, cursor: cursorVal } = {},
      idFilters: {
        ids: idsVal,
        officeIds: officeIdsVal,
        departmentIds: departmentIdsVal,
      } = {},
      deactivated: deactivatedVal,
      primaryEmail: primaryEmailVal,
      showServiceAccounts: showServiceAccountsVal,
      dateRangeFilters: {
        createdAtGte: createdAtGteVal,
        createdAtLte: createdAtLteVal,
        updatedAtGte: updatedAtGteVal,
        updatedAtLte: updatedAtLteVal,
      } = {},
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const filterParams = generatePayload({
      ids: idsVal,
      office_ids: officeIdsVal,
      department_ids: departmentIdsVal,
      deactivated: deactivatedVal,
      primary_email: primaryEmailVal,
      show_service_accounts: showServiceAccountsVal,
      "created_at[gte]": createdAtGteVal,
      "created_at[lte]": createdAtLteVal,
      "updated_at[gte]": updatedAtGteVal,
      "updated_at[lte]": updatedAtLteVal,
    });
    const data = await paginateV3<V3User>(client, "/users", shouldFetchAll, {
      perPage: perPageVal,
      cursor: cursorVal,
      params: filterParams,
    });
    return { data };
  },
  examplePayload: listUsersV3ExamplePayload,
});
