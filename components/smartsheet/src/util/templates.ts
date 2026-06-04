import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { CHILD_TYPE } from "./mergeChildren";
import { paginateByToken } from "./pagination";




export const DEFAULT_AGGREGATION_CONCURRENCY = 5;

interface WorkspaceRef {
  id: number;
}

export interface TemplateItem {
  id: number;
  name: string;
  type: string;
  [key: string]: unknown;
}















export const aggregateTemplatesAcrossWorkspaces = async (
  client: HttpClient,
): Promise<TemplateItem[]> => {
  const workspaces = await paginateByToken<WorkspaceRef>(client, "/workspaces");
  const ids = workspaces.map((w) => w.id);
  const templates: TemplateItem[] = [];

  for (let i = 0; i < ids.length; i += DEFAULT_AGGREGATION_CONCURRENCY) {
    const chunk = ids.slice(i, i + DEFAULT_AGGREGATION_CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map((id) =>
        paginateByToken<TemplateItem>(client, `/workspaces/${id}/children`, {
          query: { childrenResourceTypes: "sheets,templates" },
        }),
      ),
    );
    for (const items of chunkResults) {
      for (const item of items) {
        if (item.type === CHILD_TYPE.TEMPLATE) {
          templates.push(item);
        }
      }
    }
  }

  return templates;
};
