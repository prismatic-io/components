import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { FOLDER_MIME_TYPE, STAGGER_EVERY_N_CHUNKS } from "../../constants";
import { getFileInputs } from "../../inputs";
import { streamToBuffer } from "../../util";
import { getFileExamplePayload } from "../../examplePayloads";
export const getFile = action({
  display: {
    label: "Get File",
    description: "Gets a file's metadata and content by ID.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const drive = createClient(params.connection);
    const { fileId } = params;
    const chunkSize = 10 * 1024 * 1024;
    const { data: metadata } = await drive.files.get({
      fileId,
      fields: "mimeType,exportLinks,size,name",
      supportsAllDrives: true,
    });
    const fileSize = Number.parseInt(metadata.size || "0", 10);
    if (metadata.mimeType === FOLDER_MIME_TYPE) {
      throw new Error("Cannot download a folder.");
    }
    const requiresExport = metadata.exportLinks !== undefined;
    if (requiresExport) {
      const availableExportTypes = Object.keys(metadata.exportLinks);
      const desiredExportType = params.exportType;
      if (!desiredExportType) {
        throw new Error(
          `Export Type must be specified to export this file. Available export types: '${availableExportTypes.join(", ")}'`,
        );
      }
      const hasExportType = availableExportTypes.some(
        (type) => type === desiredExportType,
      );
      if (!hasExportType) {
        throw new Error(
          `Cannot export file with '${desiredExportType}'. Available export types: '${availableExportTypes.join(", ")}`,
        );
      }
      const { data: dataStream } = await drive.files.export(
        {
          fileId,
          alt: "media",
          mimeType: desiredExportType,
        },
        { responseType: "stream" },
      );
      const data = await streamToBuffer(dataStream);
      return {
        data,
        contentType: desiredExportType,
      };
    }
    const chunkRanges = [];
    for (let start = 0; start < fileSize; start += chunkSize) {
      const end = Math.min(start + chunkSize - 1, fileSize - 1);
      chunkRanges.push({ start, end, index: chunkRanges.length });
    }
    const DELAY_MS = 200;
    const chunkPromises = chunkRanges.map(async ({ start, end, index }) => {
      if (index % STAGGER_EVERY_N_CHUNKS === 0) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
      }
      try {
        const { data: chunkStream } = await drive.files.get(
          {
            fileId,
            alt: "media",
          },
          {
            responseType: "stream",
            headers: {
              Range: `bytes=${start}-${end}`,
            },
          },
        );
        const chunkBuffer = await streamToBuffer(chunkStream);
        return { index, buffer: chunkBuffer };
      } catch (error) {
        context.logger.error(
          `Error downloading chunk ${index + 1} at byte ${start}: ${(error as Error).message}`,
        );
        throw error;
      }
    });
    const chunkResults = await Promise.all(chunkPromises);
    const sortedChunks = chunkResults
      .sort((a, b) => a.index - b.index)
      .map((c) => c.buffer as unknown as Uint8Array);
    const mergedBuffer = Buffer.concat(sortedChunks);
    return {
      data: mergedBuffer,
      contentType: metadata.mimeType,
    };
  },
  inputs: getFileInputs,
  examplePerform: async (): Promise<{
    data: unknown;
    contentType: string;
  }> => getFileExamplePayload,
  examplePayload: getFileExamplePayload,
});
export default getFile;
