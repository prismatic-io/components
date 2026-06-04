import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { driveId as baseDriveId, connection, pageSize, query } from "../inputs";
import { getDriveQueryParams } from "../util";
import { fetchFiles, fetchDrives } from "../helpers/pagination";
import { MY_DRIVE } from "../constants";

// biome-ignore lint/correctness/noUnusedVariables: Required for input destructuring
const { dataSource: baseDriveIdDataSource, ...driveId } = baseDriveId;

const selectFolder = dataSource({
  display: {
    label: "List Folders",
    description: "Lists all available directories",
  },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const driveClient = createClient(params.connection);

    const folders: Element[] = [];

    if (params.driveId) {
      
      const { files } = await fetchFiles({
        drive: driveClient,
        initialParams: {
          q: "mimeType='application/vnd.google-apps.folder'",
          ...getDriveQueryParams(params.driveId),
        },
        fetchAll: true,
      });
      files.sort((a, b) => (a.name < b.name ? -1 : 1));
      folders.push(...files.map((file) => ({ key: file.id, label: file.name })));
    } else {
      
      const { drives } = await fetchDrives({
        drive: driveClient,
        initialParams: {},
        fetchAll: true,
      });

      const driveQueries: {
        driveId?: string;
        driveName: string;
        shared?: boolean;
      }[] = [
        
        
        { driveId: MY_DRIVE, driveName: "My Drive" },
        
        ...drives.map((drive) => ({
          driveId: drive.id,
          driveName: drive.name,
        })),
      ];

      driveQueries.sort((a, b) => (a.driveName < b.driveName ? -1 : 1));

      for (const driveQuery of driveQueries) {
        const { files } = await fetchFiles({
          drive: driveClient,
          initialParams: {
            q: "mimeType='application/vnd.google-apps.folder'",
            ...getDriveQueryParams(driveQuery.driveId),
          },
          fetchAll: true,
        });
        files.sort((a, b) => (a.name < b.name ? -1 : 1));
        folders.push(
          ...files.map((file) => ({
            key: file.id,
            label: `[${driveQuery.driveName}] ${file.name}`, 
          })),
        );
      }
    }

    return { result: folders };
  },
  inputs: { connection, driveId },
});

const selectFiles = dataSource({
  display: {
    label: "List Files",
    description: "Lists all available files",
  },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const drive = createClient(params.connection);

    const { files } = await fetchFiles({
      drive,
      initialParams: {
        q: util.types.toString(params.query) || undefined,
        driveId: params.driveId,
        pageSize: util.types.toInt(params.pageSize) || undefined,
        fields: "*",
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
        corpora: params.driveId ? "drive" : undefined,
      },
      fetchAll: true,
    });

    return {
      result: files.map((file) => ({ key: file.id, label: file.name })),
    };
  },
  inputs: { connection, driveId, query, pageSize },
});

export default { selectFolder, selectFiles };
