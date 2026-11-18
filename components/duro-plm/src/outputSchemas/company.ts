import { nullableDateTime, nullableString, userSummarySchema } from "./shared";

const roleEnum = [
  "ADMINISTRATOR",
  "APPROVER",
  "REVIEWER",
  "STAFF",
  "SUPPLIER",
  "USER",
  "VENDOR",
  null,
];

export const listCompanyUsersOutputSchema = {
  type: ["object", "null"],
  properties: {
    id: nullableString,
    name: nullableString,
    users: {
      type: ["array", "null"],
      items: {
        type: ["object", "null"],
        properties: {
          ...userSummarySchema.properties,
          created: nullableDateTime,
          role: { type: ["string", "null"], enum: roleEnum },
          title: nullableString,
          lastLogin: nullableDateTime,
        },
        required: [
          "email",
          "id",
          "firstName",
          "lastName",
          "created",
          "role",
          "title",
          "lastLogin",
        ],
      },
    },
  },
  required: ["id", "name", "users"],
};
