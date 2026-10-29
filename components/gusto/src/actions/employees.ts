import { action } from "@prismatic-io/spectral";
import {
  companyIdInput,
  connectionInput,
  employeeIdInput,
  fetchAll,
  paginationPageInput,
  firstNameInput,
  middleInitialInput,
  lastNameInput,
  dateOfBirthInput,
  emailInput,
  ssnInput,
  selfOnboardingInput,
  additionalFieldsInput,
} from "../inputs";
import { createClient } from "../client";
import { fetchAllPages } from "../util";

import {
  listEmployeesExamplePayload,
  getEmployeeExamplePayload,
  createEmployeeExamplePayload,
  findEmployeeByEmailExamplePayload,
} from "../examplePayloads";

interface Employee {
  email: string;
}

const listEmployees = action({
  display: {
    label: "List Employees",
    description: "List employees of a company",
  },
  inputs: {
    connection: connectionInput,
    companyId: companyIdInput,
    fetchAll,
    page: paginationPageInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(
        client,
        `/companies/${params.companyId}/employees`,
      );
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get(
      `/companies/${params.companyId}/employees`,
      {
        params: { page: params.page },
      },
    );
    return { data: { data, headers } };
  },
  examplePayload: listEmployeesExamplePayload,
});

const getEmployee = action({
  display: {
    label: "Get Employee",
    description: "Get an employee by ID",
  },
  inputs: {
    connection: connectionInput,
    employeeId: employeeIdInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(
      `/employees/${params.employeeId}`,
    );
    return { data: { data, headers } };
  },
  examplePayload: getEmployeeExamplePayload,
});

const createEmployee = action({
  display: {
    label: "Create Employee",
    description: "Create an employee of a company",
  },
  inputs: {
    connection: connectionInput,
    companyId: companyIdInput,
    firstName: firstNameInput,
    middleInitial: middleInitialInput,
    lastName: lastNameInput,
    dateOfBirth: dateOfBirthInput,
    email: {
      ...emailInput,
      comments: `${emailInput.comments} Required if Self Onboarding is true.`,
    },
    ssn: ssnInput,
    selfOnboarding: selfOnboardingInput,
    additionalFields: additionalFieldsInput,
  },
  perform: async (context, params) => {
    if (params.selfOnboarding && !params.email) {
      throw new Error(
        "Email Address is required when Self Onboarding is enabled.",
      );
    }
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.post(
      `/companies/${params.companyId}/employees`,
      {
        first_name: params.firstName,
        middle_initial: params.middleInitial,
        last_name: params.lastName,
        date_of_birth: params.dateOfBirth,
        email: params.email,
        ssn: params.ssn,
        self_onboarding: params.selfOnboarding,
        ...params.additionalFields,
      },
    );
    return { data: { data, headers } };
  },
  examplePayload: createEmployeeExamplePayload,
});

const findEmployeeByEmail = action({
  display: {
    label: "Find Employee by Email",
    description: "Get an employee by personal email address.",
  },
  inputs: {
    connection: connectionInput,
    companyId: companyIdInput,
    email: { ...emailInput, required: true },
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    let page = 1;
    let hasMorePages = true;
    do {
      const { data: employees, headers } = await client.get<Employee[]>(
        `/companies/${params.companyId}/employees`,
        { params: { page, per: 5 } },
      );
      for (const employee of employees) {
        if (employee.email === params.email) {
          return { data: { data: employee, headers } };
        }
      }
      hasMorePages = headers["x-total-pages"] > headers["x-page"];
      page += 1;
    } while (hasMorePages);
    throw new Error("Employee not found");
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  examplePayload: findEmployeeByEmailExamplePayload as any,
});

export default {
  createEmployee,
  findEmployeeByEmail,
  getEmployee,
  listEmployees,
};
