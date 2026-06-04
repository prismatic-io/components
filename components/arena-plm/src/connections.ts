import { connection, input, util } from "@prismatic-io/spectral";

export const arenaPlmBasicAuth = connection({
  display: {
    description: "Arena PLM Basic Auth",
    label: "Arena PLM Basic Auth",
  },
  key: "arenaPlmBasicAuth",
  inputs: {
    email: input({
      label: "Email Address",
      type: "string",
      required: true,
      example: "user@example.com",
    }),
    password: input({
      label: "Password",
      type: "password",
      required: true,
      example: "P@ssW0Rd",
    }),
    workspaceId: input({
      label: "Arena PLM Workspace ID",
      type: "string",
      required: true,
      example: "123456789",
      clean: util.types.toNumber,
    }),
    region: input({
      type: "string",
      model: [
        { name: "North America", value: "https://api.arenasolutions.com" },
        { name: "GovCloud", value: "https://api.arenagov.com" },
        { name: "Europe", value: "https://api.europe.arenaplm.com" },
        { name: "China", value: "https://api.arenaplm.cn" },
      ].map((region) => {
        return {
          label: region.name,
          value: region.value,
        };
      }),
      label: "Region",
      default: "https://api.arenasolutions.com",
      required: true,
      clean: util.types.toString,
    }),
  },
});

export default [arenaPlmBasicAuth];
