import { connection, input, util } from "@prismatic-io/spectral";
export const arenaApiKey = connection({
  key: "arenaApiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests using an API key.",
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
    apiKey: input({
      label: "API Key (arena_session_id)",
      type: "password",
      required: true,
      comments:
        "The Arena API session ID for authentication. This is obtained from the Arena instance.",
      clean: util.types.toString,
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
