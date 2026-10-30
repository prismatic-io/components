export const versionInput = {
  label: "Version",
  placeholder: "Select API version",
  type: "string",
  required: true,
  model: [
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ],
  shown: true,
  comments: "Select the Jira API version to use for requests.",
  default: "3",
} as const;
