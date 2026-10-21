import { MAX_POLL_PAGES } from "../constants";
import type {
  BigQueryChangesObject,
  BigQueryClient,
  BigQueryJobRecord,
  BigQueryRecordChange,
} from "../types";
export const fetchJobsSince = async (
  client: BigQueryClient,
  projectId: string,
  minCreationTime: number,
  maxCreationTime?: number,
): Promise<{
  jobs: BigQueryJobRecord[];
  truncated: boolean;
}> => {
  const jobs: BigQueryJobRecord[] = [];
  let pageToken: string | undefined;
  let page = 0;
  while (page < MAX_POLL_PAGES) {
    page += 1;
    const { data } = await client.jobs.list({
      projectId,
      allUsers: true,
      minCreationTime: String(minCreationTime),
      maxCreationTime:
        maxCreationTime !== undefined ? String(maxCreationTime) : undefined,
      pageToken,
    });
    jobs.push(...((data?.jobs ?? []) as unknown as BigQueryJobRecord[]));
    const nextToken = data?.nextPageToken ?? undefined;
    if (!nextToken) return { jobs, truncated: false };
    pageToken = nextToken;
  }
  return { jobs, truncated: true };
};
export const getJobCreationMs = (job: BigQueryJobRecord): number | null => {
  const raw = job.statistics?.creationTime;
  if (typeof raw !== "string") return null;
  const ms = Number(raw);
  return Number.isFinite(ms) ? ms : null;
};
export const resolvePollingRecordChanges = (
  data: BigQueryChangesObject | undefined,
): BigQueryRecordChange[] => {
  const changesObject = data ?? { created: [] };
  return [
    ...(changesObject.created ?? []).map(
      (record): BigQueryRecordChange => ({ changeType: "created", record }),
    ),
  ];
};
