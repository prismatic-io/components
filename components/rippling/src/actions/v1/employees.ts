import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import {
  getEmployeesEmployeeIdExamplePayload,
  getEmployeesExamplePayload,
  getEmployeesIncludeTerminatedExamplePayload,
} from "../../examplePayloads";
import {
  getEmployeesEmployeeIdInputs,
  getEmployeesIncludeTerminatedInputs,
  getEmployeesInputs,
} from "../../inputs";
import { paginateV1Results } from "../../utils/pagination";

const getEmployees = action({
  display: {
    label: "Get Employees (V1)",
    description: "GET Employees.",
  },
  inputs: getEmployeesInputs,
  examplePayload: getEmployeesExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1Results(client, "/employees", fetchAll, { limit, offset });
  },
});

const getEmployeesEmployeeId = action({
  display: {
    label: "Get Employees Employee Id (V1)",
    description: "GET Employee.",
  },
  inputs: getEmployeesEmployeeIdInputs,
  examplePayload: getEmployeesEmployeeIdExamplePayload,
  perform: async (context, { connection, employeeId }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.get(`/employees/${employeeId}`);
    return { data };
  },
});

const getEmployeesIncludeTerminated = action({
  display: {
    label: "Get Employees Include Terminated (V1)",
    description: "GET Employees (Including Terminated).",
  },
  inputs: getEmployeesIncludeTerminatedInputs,
  examplePayload: getEmployeesIncludeTerminatedExamplePayload,
  perform: async (context, { connection, fetchAll, limit, offset, ein }) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    return paginateV1Results(
      client,
      "/employees/include_terminated",
      fetchAll,
      {
        limit,
        offset,
        EIN: ein,
      },
    );
  },
});

export default {
  getEmployees,
  getEmployeesEmployeeId,
  getEmployeesIncludeTerminated,
};
