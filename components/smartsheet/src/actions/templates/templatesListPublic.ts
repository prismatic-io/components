import { action } from "@prismatic-io/spectral";
import { templatesListPublicExamplePayload } from "../../examplePayloads";
import { templatesListPublicInputs } from "../../inputs";
export const templatesListPublic = action({
  display: {
    label: "List Public Templates (Deprecated)",
    description:
      'This action is deprecated. Smartsheet removed the GET /templates/public endpoint with no replacement. Use the "List User Templates" action with a Workspace ID instead.',
  },
  perform: async () => {
    throw new Error(
      "The Smartsheet GET /templates/public endpoint has been removed and has no replacement. " +
        "Use the 'Templates: List' action scoped to a Workspace ID or Folder ID instead.",
    );
  },
  inputs: templatesListPublicInputs,
  examplePayload: templatesListPublicExamplePayload,
});
