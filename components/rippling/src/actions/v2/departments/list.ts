import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listDepartmentsV2ExamplePayload } from "../../../examplePayloads";
import { listDepartmentsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listDepartments = action({
  display: {
    label: "List Departments (V2)",
    description: "Retrieve a list of departments.",
  },
  inputs: listDepartmentsInputs,
  examplePayload: listDepartmentsV2ExamplePayload,
  perform: async (
    context,
    { connection, expand, orderBy, cursor, fetchAll },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/departments", fetchAll, {
      expand,
      order_by: orderBy,
      cursor,
    });
  },
});
