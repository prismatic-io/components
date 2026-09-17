import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { FOLDER_QUERY, MY_DRIVE, MY_DRIVE_LABEL } from "../constants";
import { selectFolderInputs } from "../inputs";
import { disambiguateElements, getDriveQueryParams } from "../util";
import { fetchDrives, fetchFiles } from "../util/pagination";
import { selectFolderExamplePayload } from "../examplePayloads";
export const selectFolder = dataSource({
  display: {
    label: "List Folders",
    description: "Lists all available directories.",
  },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const driveClient = createClient(params.connection);
    const folders: Element[] = [];
    if (params.driveId) {
      const { files } = await fetchFiles({
        drive: driveClient,
        initialParams: {
          q: FOLDER_QUERY,
          ...getDriveQueryParams(params.driveId),
        },
        fetchAll: true,
      });
      files.sort((a, b) => (a.name < b.name ? -1 : 1));
      folders.push(
        ...files.map((file) => ({ key: file.id, label: file.name })),
      );
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
        { driveId: MY_DRIVE, driveName: MY_DRIVE_LABEL },
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
            q: FOLDER_QUERY,
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
    return { result: disambiguateElements(folders) };
  },
  inputs: selectFolderInputs,
  examplePayload: selectFolderExamplePayload,
});
