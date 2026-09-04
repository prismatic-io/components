import { connection, input, util } from "@prismatic-io/spectral";
export const arenaUsernamePassword = connection({
  key: "arenaUsernamePassword",
  display: {
    label: "Username and Password",
    description: "Authenticate using a username, password, and workspace ID.",
  },
  inputs: {
    baseUrl: input({
      label: "Arena Environment",
      type: "string",
      required: true,
      comments:
        "Select the Arena environment region, or choose Custom URL to enter a custom URL.",
      model: [
        { label: "North America", value: "https://api.arenasolutions.com" },
        { label: "GovCloud", value: "https://api.arenagov.com" },
        { label: "Europe", value: "https://api.europe.arenaplm.com" },
        { label: "United Kingdom", value: "https://api.uk.arenaplm.com" },
        { label: "China", value: "https://api.arenaplm.cn" },
        { label: "Custom URL", value: "custom" },
      ],
      default: "https://api.arenasolutions.com",
      clean: util.types.toString,
    }),
    customBaseUrl: input({
      label: "Custom Arena URL",
      type: "string",
      required: false,
      comments:
        "The custom Arena API base URL, used only when 'Custom URL' is selected above.",
      placeholder: "https://your-arena-instance.com",
      example: "https://api.arenasolutions.com",
      clean: util.types.toString,
    }),
    email: input({
      label: "Email/Username",
      type: "string",
      required: true,
      comments:
        "The Arena account email address or username for authentication.",
      example: "user@company.com",
      clean: util.types.toString,
    }),
    password: input({
      label: "Password",
      type: "password",
      required: true,
      comments: "The Arena account password for authentication.",
      clean: util.types.toString,
    }),
    workspaceId: input({
      label: "Workspace ID",
      type: "string",
      required: false,
      comments:
        "The Arena workspace ID to log into. If not specified, will log into the user's current or last used workspace.",
      example: "12345",
      clean: util.types.toNumber,
    }),
    timeout: input({
      label: "Request Timeout",
      type: "string",
      required: false,
      default: "30000",
      comments: "The request timeout in milliseconds (default: 30 seconds).",
      example: "30000",
      clean: util.types.toNumber,
    }),
  },
});
