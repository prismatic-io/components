import { input, util } from "@prismatic-io/spectral";
import { connectionInput, filterParameters, paginationInputs } from "./common";





export const tenantIdentifier = input({
  label: "Tenant Identifier",
  type: "string",
  required: true,
  comments: "The UKG Pro tenant identifier for Talent Onboarding APIs.",
  placeholder: "Enter tenant identifier",
  example: "ACME_CORP",
  clean: util.types.toString,
});

export const newHireId = input({
  label: "New Hire ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the new hire record.",
  placeholder: "Enter new hire ID",
  example: "NH-12345",
  clean: util.types.toString,
});

export const newHireData = input({
  label: "New Hire Data",
  type: "code",
  language: "json",
  required: true,
  comments:
    "JSON object containing new hire details. See [Employee New Hire Service documentation](https://developer.ukg.com/hcm/docs/employee-new-hire-service) for required fields.",
  example: JSON.stringify(
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      startDate: "2024-02-01",
      jobTitle: "Software Engineer",
      department: "Engineering",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





export const createNewHireInputs = {
  connection: connectionInput,
  newHireData,
};

export const deleteNewHireInputs = {
  connection: connectionInput,
  newHireId,
};

export const getCanceledNewHiresInputs = {
  connection: connectionInput,
  ...paginationInputs,
  filterParameters,
};

export const getCompletedNewHiresInputs = {
  connection: connectionInput,
  ...paginationInputs,
  filterParameters,
};

export const getInProgressNewHiresInputs = {
  connection: connectionInput,
  ...paginationInputs,
  filterParameters,
};

export const getNewHireByIdInputs = {
  connection: connectionInput,
  newHireId,
};
