import type { Attachment } from "@microsoft/microsoft-graph-types";
import type { Connection } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/http";
import {
  ATTACHMENT_METADATA_SELECT,
  DEFAULT_ATTACHMENT_CONTENT_TYPE,
  ITEM_ATTACHMENT_CONTENT_TYPES,
  ITEM_ATTACHMENT_EXPAND,
  REFERENCE_ATTACHMENT_ODATA_TYPE,
} from "../constants";
import type { AttachmentDownload, ODataAttrs, PaginatedResponse } from "../types";
import { computeEndpointBasedOnConnection, fetchAllData } from ".";

export const listAttachments = (
  client: HttpClient,
  connection: Connection,
  parentPath: string,
): Promise<PaginatedResponse<Attachment & ODataAttrs>> =>
  fetchAllData<Attachment & ODataAttrs>(
    client,
    computeEndpointBasedOnConnection(connection, `${parentPath}/attachments`),
    true,
    { $select: ATTACHMENT_METADATA_SELECT },
  );

export const downloadAttachment = async (
  client: HttpClient,
  connection: Connection,
  parentPath: string,
  attachmentId: string,
): Promise<AttachmentDownload> => {
  const url = computeEndpointBasedOnConnection(
    connection,
    `${parentPath}/attachments/${attachmentId}`,
  );

  const { data: metadata } = await client.get<Attachment & ODataAttrs & { item?: ODataAttrs }>(
    url,
    { params: { $select: ATTACHMENT_METADATA_SELECT, $expand: ITEM_ATTACHMENT_EXPAND } },
  );

  if (metadata["@odata.type"] === REFERENCE_ATTACHMENT_ODATA_TYPE) {
    throw new Error(
      `Attachment "${util.types.toString(metadata.name)}" is a link to a file stored in the cloud, so it cannot be downloaded from Outlook. Download the linked file with the OneDrive or SharePoint component instead.`,
    );
  }

  const response = await client.get<ArrayBuffer>(`${url}/$value`, {
    responseType: "arraybuffer",
  });

  return {
    data: Buffer.from(response.data),
    contentType:
      util.types.toString(metadata.contentType) ||
      ITEM_ATTACHMENT_CONTENT_TYPES[util.types.toString(metadata.item?.["@odata.type"])] ||
      util.types.toString(response.headers["content-type"]) ||
      DEFAULT_ATTACHMENT_CONTENT_TYPE,
  };
};
