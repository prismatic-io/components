import type {
  ContentFragmentSearchFilter,
  ContentFragmentStatus,
} from "../types";

export const buildContentFragmentTriggerFilter = (params: {
  path?: string;
  statuses: string[];
  modelIds: string[];
  tags: string[];
  locales: string[];
}): ContentFragmentSearchFilter => ({
  path: params.path,
  status: params.statuses.length
    ? (params.statuses as ContentFragmentStatus[])
    : undefined,
  modelIds: params.modelIds.length ? params.modelIds : undefined,
  tags: params.tags.length ? params.tags : undefined,
  locale: params.locales.length ? params.locales : undefined,
});

export const toTimeInterval = (
  after?: string,
  before?: string,
): { after?: string; before?: string } | undefined =>
  after || before ? { after, before } : undefined;
