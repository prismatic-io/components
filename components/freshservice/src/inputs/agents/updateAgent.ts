import { input, structuredObjectInput } from "@prismatic-io/spectral";
import { BOOLEAN_INPUT_MODEL } from "../../constants";
import { cleanBooleanInput, cleanStringInput } from "../../util";
import { connection } from "../common";
import {
  address,
  agentId,
  agentsAdditionalFields,
  canSeeAllTicketsFromAssociatedDepartments,
  departmentIds,
  email,
  occasional,
  roles,
  scoreboardLevelId,
  signature,
} from "./common";
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Email, Address, Occasional, Signature, and Can See All Tickets From Associated Departments.",
  inputs: {
    email: input({
      ...email,
      required: false,
      clean: cleanStringInput,
    }),
    address,
    occasional: input({
      ...occasional,
      required: false,
      type: "string",
      default: undefined,
      model: BOOLEAN_INPUT_MODEL,
      clean: cleanBooleanInput,
    }),
    signature,
    canSeeAllTicketsFromAssociatedDepartments: input({
      ...canSeeAllTicketsFromAssociatedDepartments,
      required: false,
      type: "string",
      default: undefined,
      model: BOOLEAN_INPUT_MODEL,
      clean: cleanBooleanInput,
    }),
  },
});
export const updateAgentInputs = {
  connection,
  agentId: input({
    ...agentId,
    comments: "Unique ID of the agent to update.",
  }),
  roles: input({
    ...roles,
    required: false,
  }),
  scoreboardLevelId,
  departmentIds,
  additionalFields,
  agentsAdditionalFields,
};
