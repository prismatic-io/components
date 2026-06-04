import { input } from "@prismatic-io/spectral";
import { additionalFields, connection } from "../shared";
import { cleanStringInput } from "../../utils";

const DOCUMENTATION_COMMENTS = `See [Karbon API documentation](https://karbonhq.github.io/karbon-api-reference/#post-/v3/WorkItems) for more information.`;

const assigneeEmailAddres = input({
  label: "Assignee Email Address",
  type: "string",
  comments:
    "The email address of the user to whom the Work Item is going to be assigned.",
  required: true,
  clean: cleanStringInput,
  example: "example@email.com",
  placeholder: "example@email.com",
});

const title = input({
  label: "Title",
  type: "string",
  comments: "The title of the Work Item.",
  required: true,
  clean: cleanStringInput,
  example: "Work Item Title",
  placeholder: "Work Item Title",
});

const clientKey = input({
  label: "Client Key",
  type: "string",
  comments:
    "A Karbon-generated value used to identify the existing Client (Contact, Organization or ClientGroup) for whom the Work Item is prepared.",
  required: true,
  clean: cleanStringInput,
  example: "p56mtcBhwb9",
  placeholder: "p56mtcBhwb9",
});

const clientType = input({
  label: "Client Type",
  type: "string",
  model: ["Contact", "Organization", "ClientGroup"].map((value) => ({
    value,
    label: value,
  })),
  comments: "The type of the Client.",
  required: true,
  example: "Organization",
  clean: cleanStringInput,
});

const relatedClientGroupKey = input({
  label: "Related Client Group Key",
  type: "string",
  comments:
    "A Karbon-generated value used to identify the Client Group of the Client.",
  clean: cleanStringInput,
  example: "4f3gHnLC323",
  required: false,
  placeholder: "4f3gHnLC323",
});

const startDate = input({
  label: "Start Date",
  type: "string",
  comments: "The date and time at which the Work Item should start.",
  required: true,
  example: "2022-01-30",
  placeholder: "2022-01-30",
  clean: cleanStringInput,
});

export default {
  connection,
  assigneeEmailAddres,
  title,
  clientKey,
  clientType,
  relatedClientGroupKey,
  startDate,
  additionalFields: input({
    ...additionalFields,
    example: JSON.stringify(
      {
        DueDate: "2022-01-30",
        DeadlineDate: "2022-01-31",
        WorkType: "Payroll",
        WorkStatus: "Ready To Start - Send client requests",
        WorkTemplateKey: "p56mtcBhwb9",
        WorkScheduleKey: "4f3gHnLC323",
        Description: "Send to Jo for review",
        UserRoleAssignments: [
          {
            RoleKey: "2mYzTtly89Lq",
            UserProfileKey: "2Qy48WVCRBcP",
          },
        ],
        ClientTaskRecipient: {
          RecipientKey: "4ncPZ7q96SGc",
          LinkType: "Organization",
          EmailAddress: "acme@corp.com",
        },
        FeeSettings: {
          FeeType: "FixedFee",
          FeeValue: 5150.2,
        },
      },
      null,
      2,
    ),
    comments: `${additionalFields.comments} ${DOCUMENTATION_COMMENTS}`,
  }),
};
