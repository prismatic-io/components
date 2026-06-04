import type { Flow, FileProperties } from "jsforce/lib/api/metadata";
import type { Connection, Schema } from "jsforce";

export const getAllFlowMetadata = async (client: Connection<Schema>) => {
  const flows = await client.metadata.list({ type: "Flow" });

  if (!flows || flows.length === 0) return [];

  const BATCH_SIZE = 10;

  const allFlowMetadata: (Partial<FileProperties> & Partial<Flow>)[] = [];

  for (let i = 0; i < flows.length; i += BATCH_SIZE) {
    const batch = flows.slice(i, i + BATCH_SIZE);
    const apiNames = batch.map((f: FileProperties) => f.fullName);

    const result = await client.metadata.read("Flow", apiNames);

    
    if (Array.isArray(result)) {
      allFlowMetadata.push(...result);
    } else {
      allFlowMetadata.push(result);
    }
  }

  return allFlowMetadata;
};
