import { input, util } from "@prismatic-io/spectral";

export const mobileAppAssignmentId = input({
  label: "Mobile App Assignment Id",
  comments: "Unique Identifier for the mobile app assignment to get.",
  example: "0177548a-548a-0177-8a54-77018a547701",
  placeholder: "Enter mobile app assignment ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMobileAppAssignment",
});
