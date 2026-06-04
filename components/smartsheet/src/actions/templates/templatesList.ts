import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { templatesListExamplePayload } from "../../examplePayloads";
import { templatesListInputs } from "../../inputs";
import { warnDeprecatedInputs } from "../../util/deprecation";
import { CHILD_TYPE } from "../../util/mergeChildren";
import { paginateByToken } from "../../util/pagination";
import { aggregateTemplatesAcrossWorkspaces } from "../../util/templates";

export const templatesList = action({
  display: {
    label: "List User Templates",
    description: "Lists user-created templates.",
  },
  perform: async (
    context,
    { connection, workspaceIdForTemplates, includeAll },
  ) => {
    warnDeprecatedInputs(context, "templatesList", includeAll);
    const client = createClient(connection, context.debug.enabled);

    if (workspaceIdForTemplates) {
      const items = await paginateByToken<Record<string, unknown>>(
        client,
        `/workspaces/${workspaceIdForTemplates}/children`,
        { query: { childrenResourceTypes: "sheets,templates" } },
      );
      return {
        data: items.filter((i) => i.type === CHILD_TYPE.TEMPLATE),
      };
    }

    const templates = await aggregateTemplatesAcrossWorkspaces(client);
    return { data: templates };
  },
  inputs: templatesListInputs,
  examplePayload: templatesListExamplePayload,
});
