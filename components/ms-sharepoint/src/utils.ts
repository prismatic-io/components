import {
  ConnectionError,
  type Connection,
  type Element,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type {
  DeltaCursor,
  Drive,
  DriveDeltaPage,
  DriveItem,
  DriveResponse,
  DriveTriggerItem,
  PaginateOptions,
  PollingRecordChange,
  PollingState,
  PollSiteChangesResult,
  PollSiteChangesSeparatedChanges,
  SiteDeltaCursor,
} from "./interfaces";
import connections, { certificateCredentials } from "./connections";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { DELTA_NEXT_LINK_SUFFIX } from "./constants";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection method ${connection.key}.`,
    );
  }
};

export const paginateResults = async <T>(
  client: HttpClient,
  endpoint: string,
  {
    returnFullData = false,
    useTop = true,
    excludeParents = false,
  }: PaginateOptions = {},
) => {
  const results = [];
  let nextLink = endpoint;
  let isFirstTime = true;
  let fullData: Record<string, unknown>;
  do {
    const { data } = await client.get(nextLink, {
      params: isFirstTime && useTop ? { $top: 100 } : undefined,
      headers: {
        Prefer: excludeParents ? "deltaExcludeParent" : undefined,
      },
    });

    const existent = results.map((r) => r.id);
    const toAdd = data.value.filter(
      (r: Record<string, unknown>) => !existent.includes(r.id),
    );

    results.push(...toAdd);
    nextLink = data["@odata.nextLink"];

    isFirstTime = false;
    fullData = data;
  } while (nextLink);

  if (returnFullData) {
    fullData.value = results;
    return fullData as T;
  }

  return results;
};

export const sortArray = (array: Element[]) => {
  return array.sort((a, b) => ((a.label || "") < (b.label || "") ? -1 : 1));
};

export const getFilesFromDriveFN = async (
  client: HttpClient,
  driveId: string,
  drives: DriveItem[] = [],
): Promise<{ value: DriveItem[]; "@odata.context"?: string }> => {
  const allFiles: DriveItem[] = [];
  let rootContext: string | undefined;

  const processFolder = async (folderId: string): Promise<DriveItem[]> => {
    const folderFiles: DriveItem[] = [];
    let nextLink: string | undefined;

    do {
      const endpoint =
        folderId === "root"
          ? `/drives/${driveId}/root/children`
          : `/drives/${driveId}/items/${folderId}/children`;

      const { data } = await client.get<DriveResponse>(nextLink || endpoint);

      if (folderId === "root" && !rootContext) {
        rootContext = data["@odata.context"];
      }

      const folders: DriveItem[] = [];

      for (const item of data.value) {
        if (item.folder) {
          folders.push(item);
        } else {
          folderFiles.push(item);
        }
      }

      if (folders.length > 0) {
        const subFolderResults = await Promise.all(
          folders.map((folder) => processFolder(folder.id)),
        );
        folderFiles.push(...subFolderResults.flat());
      }

      nextLink = data["@odata.nextLink"];
    } while (nextLink);

    return folderFiles;
  };

  if (drives.length > 0) {
    const driveResults = await Promise.all(
      drives.map(async (drive) => {
        if (drive.folder) {
          return processFolder(drive.id);
        }
        return [drive];
      }),
    );
    allFiles.push(...driveResults.flat());
  } else {
    const rootFiles = await processFolder("root");
    allFiles.push(...rootFiles);
  }

  return {
    value: allFiles,
    ...(rootContext ? { "@odata.context": rootContext } : {}),
  };
};

export const getAccessToken = async (connection: Connection) => {
  if (connection.key === certificateCredentials.key) {
    const authority = `${connection.fields.entraIdEndpoint}/${connection.fields.tenant}`;
    const app = new ConfidentialClientApplication({
      auth: {
        clientId: util.types.toString(connection.fields.clientId),
        clientCertificate: {
          privateKey: util.types
            .toString(connection.fields.certificate)
            .replace(/\\n/g, "\n"),
          thumbprint: util.types.toString(
            connection.fields.certificateThumbprint,
          ),
        },
        authority,
      },
    });
    const result = await app.acquireTokenByClientCredential({
      scopes: util.types
        .toString(connection.fields.scopes)
        .split(",")
        .map((s) => s.trim()),
    });
    if (!result) {
      throw new ConnectionError(
        connection,
        "Could not acquire access token with certificate.",
      );
    }
    return result?.accessToken;
  }
  return util.types.toString(connection.token?.access_token);
};

const addDeleted = ({
  change,
  isDeleted,
  separatedChanges,
}: DriveTriggerItem) => {
  if (isDeleted) {
    if (!separatedChanges.deleted) {
      separatedChanges.deleted = [];
    }
    separatedChanges.deleted.push(change);
  }
};

const addUpdated = ({
  change,
  isDeleted,
  separatedChanges,
}: DriveTriggerItem) => {
  if (
    change.lastModifiedDateTime &&
    change.createdDateTime &&
    new Date(change.lastModifiedDateTime) > new Date(change.createdDateTime) &&
    !isDeleted
  ) {
    if (!separatedChanges.updated) {
      separatedChanges.updated = [];
    }
    separatedChanges.updated.push(change);
  }
};

const addCreated = ({
  change,
  isDeleted,
  separatedChanges,
}: DriveTriggerItem) => {
  if (change.lastModifiedDateTime === change.createdDateTime && !isDeleted) {
    if (!separatedChanges.added) {
      separatedChanges.added = [];
    }
    separatedChanges.added.push(change);
  }
};

export const separateDriveChanges = (
  items: DriveItem[],
  isMatch: (change: DriveItem) => boolean = () => true,
): PollSiteChangesSeparatedChanges => {
  const separatedChanges: PollSiteChangesSeparatedChanges = {};
  for (const change of items) {
    const isDeleted = Object.keys(change).includes("deleted");
    const isRoot = Object.keys(change).includes("root");
    if (isRoot || !isMatch(change)) {
      continue;
    }
    addDeleted({ isDeleted, separatedChanges, change });
    addUpdated({ isDeleted, separatedChanges, change });
    addCreated({ isDeleted, separatedChanges, change });
  }
  return separatedChanges;
};

const deltaNextLinkKey = (key: string): string =>
  `${key}${DELTA_NEXT_LINK_SUFFIX}`;

export const resolveDeltaUrl = (
  state: PollingState,
  key: string,
  rootDelta: string,
  incomingNextLink?: string,
): string =>
  incomingNextLink ?? state[deltaNextLinkKey(key)] ?? state[key] ?? rootDelta;

const resyncLocation = (error: unknown): string | undefined | null => {
  const response = (
    error as {
      response?: { status?: number; headers?: Record<string, unknown> };
    }
  )?.response;
  if (response?.status !== 410) return null;
  const location = response.headers?.location;
  return typeof location === "string" && location ? location : undefined;
};

const fetchDeltaPage = async (
  client: HttpClient,
  url: string,
  rootDelta: string,
): Promise<DriveDeltaPage> => {
  const get = async (target: string): Promise<DriveDeltaPage> => {
    const { data } = await client.get<DriveDeltaPage>(target, {
      params: undefined,
      headers: { Prefer: "deltaExcludeParent" },
    });
    return data;
  };
  try {
    return await get(url);
  } catch (error) {
    const location = resyncLocation(error);
    if (location === null) throw error;
    return get(location ?? rootDelta);
  }
};

export const fetchDeltaRound = async (
  client: HttpClient,
  state: PollingState,
  key: string,
  rootDelta: string,
  incoming: DeltaCursor | undefined,
): Promise<{
  page: DriveDeltaPage;
  next: DeltaCursor | null;
  cursorState: PollingState;
}> => {
  const page = await fetchDeltaPage(
    client,
    resolveDeltaUrl(state, key, rootDelta, incoming?.nextLink),
    rootDelta,
  );
  const nextLink = page["@odata.nextLink"];
  if (nextLink) {
    return {
      page,
      next: { nextLink },
      cursorState: {
        ...(state[key] ? { [key]: state[key] } : {}),
        [deltaNextLinkKey(key)]: nextLink,
      },
    };
  }
  return {
    page,
    next: null,
    cursorState: { [key]: page["@odata.deltaLink"] as string },
  };
};

export const folderPathFrom = (
  items: DriveItem[],
  folderId: string,
  current: string | undefined,
): string | undefined => {
  const targetFolder = items.find((item) => item.id === folderId);
  if (!targetFolder) return current;
  return targetFolder.parentReference?.path
    ? `${targetFolder.parentReference.path}/${targetFolder.name}`
    : `/root:/${targetFolder.name}`;
};

export const folderMatcher =
  (
    folderId: string,
    includeSubfolders: boolean,
    folderPath: string | undefined,
  ): ((change: DriveItem) => boolean) =>
  (change: DriveItem): boolean => {
    const isFolderItself = change.id === folderId;
    if (includeSubfolders && folderPath) {
      return isFolderItself || change.parentReference.path.includes(folderPath);
    }
    return isFolderItself || change.parentReference?.id === folderId;
  };

export const fetchSiteDeltaRound = async (
  client: HttpClient,
  state: PollingState,
  rootDeltaFor: (driveId: string) => string,
  drives: Drive[],
  incoming: SiteDeltaCursor | undefined,
): Promise<{
  changes: PollSiteChangesResult;
  next: SiteDeltaCursor | null;
  newPollingState: PollingState;
}> => {
  const drivesById = new Map(drives.map((drive) => [drive.id, drive]));
  let remaining = (
    incoming?.remaining ?? drives.map((drive) => drive.id)
  ).filter((id) => drivesById.has(id));
  let resume: DeltaCursor | undefined =
    incoming?.nextLink && incoming.remaining[0] === remaining[0]
      ? { nextLink: incoming.nextLink }
      : undefined;

  const newPollingState: PollingState = {};
  for (const drive of drives) {
    for (const key of [drive.id, deltaNextLinkKey(drive.id)]) {
      if (state[key]) newPollingState[key] = state[key];
    }
  }

  const changes: PollSiteChangesResult = {};
  while (remaining.length > 0) {
    const drive = drivesById.get(remaining[0]) as Drive;
    const { page, next, cursorState } = await fetchDeltaRound(
      client,
      state,
      drive.id,
      rootDeltaFor(drive.id),
      resume,
    );
    resume = undefined;
    delete newPollingState[deltaNextLinkKey(drive.id)];
    Object.assign(newPollingState, cursorState);

    const driveChanges = separateDriveChanges(page.value);
    const hasChanges = Object.keys(driveChanges).length > 0;
    if (hasChanges) changes[drive.name] = driveChanges;

    if (next)
      return {
        changes,
        next: { remaining, nextLink: next.nextLink },
        newPollingState,
      };
    remaining = remaining.slice(1);
    if (hasChanges) break;
  }
  return {
    changes,
    next: remaining.length > 0 ? { remaining } : null,
    newPollingState,
  };
};

export const resolvePollingRecordChanges = (
  data: PollSiteChangesSeparatedChanges | undefined,
): PollingRecordChange[] => {
  const changesObject = data ?? {};
  return [
    ...(changesObject.deleted ?? []).map(
      (record): PollingRecordChange => ({ changeType: "deleted", record }),
    ),
    ...(changesObject.added ?? []).map(
      (record): PollingRecordChange => ({ changeType: "added", record }),
    ),
    ...(changesObject.updated ?? []).map(
      (record): PollingRecordChange => ({ changeType: "updated", record }),
    ),
    ...(changesObject.moved ?? []).map(
      (record): PollingRecordChange => ({ changeType: "moved", record }),
    ),
  ];
};

export const resolveSitePollingRecordChanges = (
  data: PollSiteChangesResult | undefined,
): PollingRecordChange[] =>
  Object.values(data ?? {}).flatMap((driveChanges) =>
    resolvePollingRecordChanges(driveChanges),
  );
