import { input, util } from "@prismatic-io/spectral";
import { connectionInput, paginationInputs } from "./common";
import { companyId } from "./employee";





export const pendingHireId = input({
  label: "Pending Hire ID",
  placeholder: "Enter pending hire ID",
  comments: "The unique identifier of the pending hire record.",
  type: "string",
  required: true,
  example: "PH-10001",
  clean: util.types.toString,
});

export const recordId = input({
  label: "Record ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the pending hire record.",
  placeholder: "Enter record ID",
  example: "PH-12345",
  clean: util.types.toString,
});

export const pendingHireData = input({
  label: "Pending Hire Data",
  type: "code",
  language: "json",
  required: true,
  comments:
    "JSON object containing pending hire details. See [Pending Hire Service documentation](https://developer.ukg.com/hcm/docs/pending-hire-service) for required fields.",
  example: JSON.stringify(
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      expectedStartDate: "2024-03-01",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





export const getPendingHiresInputs = {
  connection: connectionInput,
  companyId,
  ...paginationInputs,
};

export const updatePendingHireInputs = {
  connection: connectionInput,
  pendingHireId,
  pendingHireData,
};
