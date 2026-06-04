import { ConnectionError, type Connection, type Element, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { DriveItem, DriveResponse, DriveTriggerItem } from "./interfaces";
import connections, { certificateCredentials } from "./connections";
import { ConfidentialClientApplication } from "@azure/msal-node";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(connection, `Unsupported connection method ${connection.key}.`);
  }
};

export const paginateResults = async <T>(
  client: HttpClient,
  endpoint: string,
  returnFullData = false,
  useTop = true,
  excludeParents = false,
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
    const toAdd = data.value.filter((r: Record<string, unknown>) => !existent.includes(r.id));

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
): Promise<DriveItem[]> => {
  const allFiles: DriveItem[] = [];

  const processFolder = async (folderId: string): Promise<DriveItem[]> => {
    const folderFiles: DriveItem[] = [];
    let nextLink: string | undefined;

    do {
      const endpoint =
        folderId === "root"
          ? `/drives/${driveId}/root/children`
          : `/drives/${driveId}/items/${folderId}/children`;

      const { data } = await client.get<DriveResponse>(nextLink || endpoint);

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

  return allFiles;
};

export const getAccessToken = async (connection: Connection) => {
  if (connection.key === certificateCredentials.key) {
    const authority = `${connection.fields.entraIdEndpoint}/${connection.fields.tenant}`;
    const app = new ConfidentialClientApplication({
      auth: {
        clientId: util.types.toString(connection.fields.clientId),
        clientCertificate: {
          privateKey: util.types.toString(connection.fields.certificate).replace(/\\n/g, "\n"),
          thumbprint: util.types.toString(connection.fields.certificateThumbprint),
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
      throw new ConnectionError(connection, "Could not acquire access token with certificate.");
    }
    return result?.accessToken;
  }
  return util.types.toString(connection.token?.access_token);
};

export const addDeleted = ({ change, isDeleted, separatedChanges }: DriveTriggerItem) => {
  if (isDeleted) {
    if (!separatedChanges.deleted) {
      separatedChanges.deleted = [];
    }
    separatedChanges.deleted.push(change);
  }
};

export const addUpdated = ({ change, isDeleted, separatedChanges }: DriveTriggerItem) => {
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

export const addCreated = ({ change, isDeleted, separatedChanges }: DriveTriggerItem) => {
  if (change.lastModifiedDateTime === change.createdDateTime && !isDeleted) {
    if (!separatedChanges.added) {
      separatedChanges.added = [];
    }
    separatedChanges.added.push(change);
  }
};
