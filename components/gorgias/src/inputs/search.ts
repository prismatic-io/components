import { input } from "@prismatic-io/spectral";
import { toStr } from "../utils/toStr";
import { validateLimit } from "../utils/validateLimit";
import { sharedInputs } from "./shared";

export const searchInputs = {
  type: input({
    label: "Type",
    type: "string",
    required: true,
    comments: "The type of object to search for.",
    clean: toStr,
    placeholder: "agent",
    example: "agent",
    model: [
      { value: "agent", label: "Agent" },
      { value: "customer", label: "Customer" },
      { value: "customer_profile", label: "Customer Profile" },
      { value: "customer_channel", label: "Customer Channel" },
      { value: "customer_channel_email", label: "Customer Channel Email" },
      { value: "customer_channel_phone", label: "Customer Channel Phone" },
      { value: "customers_by_phone", label: "Customers By Phone" },
      { value: "integration", label: "Integration" },
      { value: "team", label: "Team" },
      { value: "tag", label: "Tag" },
    ],
  }),
  query: input({
    label: "Query",
    type: "string",
    required: false,
    comments: "Text query used to search for resources.",
    clean: toStr,
    placeholder: "user@example.com",
    example: "user@example.com",
  }),
  size: input({
    label: "Size",
    type: "string",
    required: false,
    comments: "Maximum number of results returned.",
    clean: (value) => validateLimit(value, 1, 50),
    placeholder: "10",
    example: "10",
  }),
  ...sharedInputs,
};
