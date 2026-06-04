import { action } from "@prismatic-io/spectral";
import {
  connectionInput,
  type,
  dryRun,
  onFinish,
  setEmployeePrimaryPolicy,
  shouldFixApprovalChains,
  employees,
} from "../inputs";
import { createClient } from "../client";
import { generatePayload } from "../util";
import { updateEmployeeExamplePayload } from "../examplePayloads";

export const updateEmployee = action({
  display: {
    description: "Add, update or remove policy members",
    label: "Update Employee",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "employees",
      comments: "Specifies to the job that it has to update an employee",
    },
    employees,
    dryRun,
    onFinish,
    setEmployeePrimaryPolicy,
    shouldFixApprovalChains,
  },
  perform: async (
    context,
    {
      connectionInput,
      type,
      dryRun,
      onFinish,
      setEmployeePrimaryPolicy,
      shouldFixApprovalChains,
      employees,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: "update",
      inputSettings: {
        type: type || undefined,
        entity: "generic",
      },
      dataSource: "request",
      "dry-run": dryRun || undefined,
      onFinish: onFinish || undefined,
      setEmployeePrimaryPolicy: setEmployeePrimaryPolicy || undefined,
      shouldFixApprovalChains: shouldFixApprovalChains || undefined,
      employees: employees || undefined,
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePayload: {
    data: updateEmployeeExamplePayload,
  },
});
