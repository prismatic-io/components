import { FolderType } from "../types/folderTypes";

export function getFolderPath(
  employeeId: string,
  folderType: string,
  folderId?: string,
  documentId?: string,
): string {
  const basePath = `/docs/people/${employeeId}`;

  switch (folderType) {
    case FolderType.SHARED:
      return documentId
        ? `${basePath}/shared/${documentId}`
        : `${basePath}/shared`;
    case FolderType.CONFIDENTIAL:
      return documentId
        ? `${basePath}/confidential/${documentId}`
        : `${basePath}/confidential`;
    case FolderType.CUSTOM:
      if (!folderId) {
        throw new Error("Folder ID is required for custom folder type");
      }
      return documentId
        ? `${basePath}/folders/${folderId}/${documentId}`
        : `${basePath}/custom/${folderId}`;
    default:
      throw new Error(`Invalid folder type: ${folderType}`);
  }
}
