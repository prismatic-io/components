export const nullableString = { type: ["string", "null"] };
export const nullableBoolean = { type: ["boolean", "null"] };
export const nullableNumber = { type: ["number", "null"] };
export const nullableInteger = { type: ["integer", "null"] };
export const nullableDateTime = {
  type: ["string", "null"],
  format: "date-time",
};

export const userSummarySchema = {
  type: ["object", "null"],
  properties: {
    id: nullableString,
    email: nullableString,
    firstName: nullableString,
    lastName: nullableString,
  },
  required: ["id", "email", "firstName", "lastName"],
};

export const cpnDisplaySchema = {
  type: ["object", "null"],
  properties: { displayValue: nullableString },
  required: ["displayValue"],
};
