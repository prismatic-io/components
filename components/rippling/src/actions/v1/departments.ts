import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getDepartmentsExamplePayload } from "../../examplePayloads";
import { getDepartmentsInputs } from "../../inputs";
import { paginateV1Results } from "../../utils/pagination";

const getDepartments = action({
  display: {
    label: "Get Departments (V1)",
    description: "GET Departments.",
  },
  inputs: getDepartmentsInputs,
  examplePayload: getDepartmentsExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1Results(client, "/departments", fetchAll, {
      limit,
      offset,
    });
  },
});

export default {
  getDepartments,
};
