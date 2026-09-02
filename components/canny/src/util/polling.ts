import type { CannyPostChange, CannyPostChangesObject, Post } from "../types";
export const collectPostChanges = (
  posts: Post[],
  since: string,
  options: {
    isInitialSync: boolean;
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
): CannyPostChangesObject => {
  const { isInitialSync, showNewRecords, showUpdatedRecords } = options;
  const { created, updated } = classifyPostsByPollDate(
    posts,
    since,
    isInitialSync,
  );
  return {
    created: isInitialSync || showNewRecords ? created : [],
    updated: isInitialSync || showUpdatedRecords ? updated : [],
  };
};
export const resolvePostChanges = (
  data: CannyPostChangesObject | undefined,
): CannyPostChange[] => {
  const changesObject = data ?? { created: [], updated: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): CannyPostChange => ({ changeType: "created", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): CannyPostChange => ({ changeType: "updated", record }),
    ),
  ];
};
export const classifyPostsByPollDate = (
  posts: Post[],
  since: string,
  inclusive = false,
): CannyPostChangesObject => {
  const sinceMs = new Date(since).getTime();
  const isAfter = (ms: number) =>
    !Number.isNaN(ms) && (inclusive ? ms >= sinceMs : ms > sinceMs);
  const created: Post[] = [];
  const updated: Post[] = [];
  for (const post of posts) {
    const createdMs = post.created
      ? new Date(post.created).getTime()
      : Number.NaN;
    const statusChangedMs = post.statusChangedAt
      ? new Date(post.statusChangedAt).getTime()
      : Number.NaN;
    const isNew = isAfter(createdMs);
    const isUpdated = !isNew && isAfter(statusChangedMs);
    if (isNew) {
      created.push(post);
    } else if (isUpdated) {
      updated.push(post);
    }
  }
  return { created, updated };
};
