import type { ActionLogger } from "@prismatic-io/spectral";
import type { Connection, Schema } from "jsforce";
import type { SaveResult as MetadataSaveResult } from "jsforce/lib/api/metadata/schema";
import type { FlowMetadata } from "../types";






export const processMetadataResultLogging = (
  result: MetadataSaveResult,
  logger: ActionLogger,
  logMessage = "",
  searchExtendedErrorDetails?: string,
): MetadataSaveResult => {
  if (result.success) {
    return result;
  }
  let errorPresent = false;
  const errorMessage = result.errors
    .filter(Boolean)
    .map(({ statusCode, message, extendedErrorDetails, fields }) => {
      if (
        searchExtendedErrorDetails &&
        message.toLowerCase().includes(searchExtendedErrorDetails.toLowerCase())
      ) {
        errorPresent = true;
      }
      return [statusCode, message, extendedErrorDetails, fields.join(", ")]
        .filter(Boolean)
        .join(" - ");
    });
  if (searchExtendedErrorDetails && errorPresent) {
    logger.error(logMessage);
    
    
    logger.error(`Salesforce response detail: ${errorMessage.join(" | ")}`);
    return;
  }
  throw new Error(errorMessage.join("\n\n"));
};




export const processMetadataResult = (result: MetadataSaveResult): MetadataSaveResult => {
  if (result.success) {
    return result;
  }

  const errorMessage = result.errors
    .filter(Boolean)
    .map(({ statusCode, message, extendedErrorDetails, fields }) =>
      [statusCode, message, extendedErrorDetails, fields.join(", ")].filter(Boolean).join(" - "),
    );
  throw new Error(errorMessage.join("\n\n"));
};








export const toFullNameIdentifier = (objectType: string, name: string): string => {
  const cleanedName = name.split(/\s+/g).join("_");
  return `${objectType}.${cleanedName}`;
};


export const parseFullNameIdentifier = (fullName: string): { objectType: string; name: string } => {
  const [objectType, name] = fullName.split(".");
  return { objectType, name };
};



export const generateApiName = (flowName: string): string => {
  const trimmed = flowName.trim();

  
  
  if (trimmed.includes("_") && !trimmed.includes(" ")) {
    
    return trimmed.replace(/[^a-zA-Z0-9_]/g, "");
  }

  
  return trimmed
    .replace(/[^a-zA-Z0-9\s]/g, "") 
    .replace(/\s+/g, "_") 
    .replace(/_{2,}/g, "_"); 
};

export const removeObjectPrefix = (value: string): string => {
  const parts = value.split(".");
  return parts.length > 1 ? parts.slice(1).join(".") : value;
};

export const getObjectPrefix = (value: string): string => {
  const parts = value.split(".");
  return parts.length > 1 ? parts[0] : "";
};


export const listFlowsFunction = async (client: Connection<Schema>) => {
  return await client.metadata.list({ type: "Flow" });
};

export const getFlowFunction = async (client: Connection<Schema>, flowApiName: string) => {
  const result = await client.metadata.read("Flow", flowApiName);
  return result;
};

export const createFlowFunction = async (
  client: Connection<Schema>,
  flowMetadata: FlowMetadata,
) => {
  return await client.metadata.create("Flow", flowMetadata);
};

export const updateFlowFunction = async (
  client: Connection<Schema>,
  flowMetadata: FlowMetadata,
) => {
  return processMetadataResult(await client.metadata.update("Flow", flowMetadata));
};

export const deleteFlowFunction = async (client: Connection<Schema>, flowApiName: string) => {
  return processMetadataResult(await client.metadata.delete("Flow", flowApiName));
};

export const activateFlowFunction = async (client: Connection, flowApiName: string) => {
  const flowData = await getFlowFunction(client, flowApiName);

  const flowMetadata: FlowMetadata = {
    ...flowData,
    fullName: flowData.fullName || flowApiName,
    status: "Active",
  };
  return updateFlowFunction(client, flowMetadata);
};

export const deactivateFlowFunction = async (client: Connection<Schema>, flowApiName: string) => {
  return await client.metadata.update("FlowDefinition", {
    fullName: flowApiName, 
    activeVersionNumber: null,
  });
};











export const getOrgNamespacePrefix = async (
  client: Connection<Schema>,
  logger: ActionLogger,
): Promise<string | undefined> => {
  try {
    const result = await client.query("SELECT NamespacePrefix FROM Organization LIMIT 1");
    const prefix = (result?.records?.[0] as { NamespacePrefix?: string | null })?.NamespacePrefix;
    return prefix || undefined;
  } catch (error) {
    logger.warn("Unable to retrieve Organization NamespacePrefix:", error);
    return undefined;
  }
};







const logWorkflowOutboundMessagePrefixSummary = async (
  client: Connection<Schema>,
  logger: ActionLogger,
): Promise<void> => {
  try {
    const result = await client.tooling.query(
      "SELECT NamespacePrefix, COUNT(Id) c FROM WorkflowOutboundMessage GROUP BY NamespacePrefix",
    );
    const summary = (result?.records ?? [])
      .map((r) => {
        const row = r as { NamespacePrefix?: string | null; c?: number };
        return `${row.NamespacePrefix ?? "(none)"}=${row.c ?? 0}`;
      })
      .join(", ");
    logger.info(`WorkflowOutboundMessage namespace prefixes in org: ${summary || "(no rows)"}`);
  } catch (error) {
    logger.warn("Unable to summarize WorkflowOutboundMessage namespace prefixes:", error);
  }
};

export const deactivateAndDeleteFlowResources = async (
  client: Connection<Schema>,
  logger: ActionLogger,
  flowFullName: string,
  outboundMessageFullName: string,
  debug: boolean,
): Promise<void> => {
  
  if (debug) {
    logger.info(`Deactivating and deleting flow ${flowFullName}`);
  }
  const deactivateFlowResult = await client.metadata.update("FlowDefinition", {
    fullName: flowFullName,
    activeVersionNumber: null,
  });

  processMetadataResultLogging(
    deactivateFlowResult,
    logger,
    `Flow ${flowFullName} already deactivated`,
    "In field: fullName - no FlowDefinition named",
  );
  logger.info(`Flow ${flowFullName} deactivated`);

  
  const deleteFlowResult = await client.metadata.delete("Flow", flowFullName);
  processMetadataResultLogging(
    deleteFlowResult,
    logger,
    `Flow ${flowFullName} already deleted`,
    "In field: name - no Flow named",
  );
  logger.info(`Flow ${flowFullName} deleted`);

  const namespacePrefix = (await getOrgNamespacePrefix(client, logger)) || "";
  if (debug) {
    logger.info(
      namespacePrefix
        ? `Org namespace prefix (from Organization table): ${namespacePrefix}`
        : "No org namespace (Organization.NamespacePrefix is null)",
    );
    await logWorkflowOutboundMessagePrefixSummary(client, logger);
  }
  const toDeleteOutboundMessageFullName = namespacePrefix
    ? toFullNameIdentifier(
        getObjectPrefix(outboundMessageFullName),
        `${namespacePrefix}__${removeObjectPrefix(outboundMessageFullName)}`,
      )
    : outboundMessageFullName;

  if (debug) {
    logger.info(`To delete outbound message full name: ${toDeleteOutboundMessageFullName}`);
  }
  
  const deleteWorkflowOutboundMessageResult = await client.metadata.delete(
    "WorkflowOutboundMessage",
    toDeleteOutboundMessageFullName,
  );

  if (debug) {
    logger.info(
      `Raw delete result for ${toDeleteOutboundMessageFullName}: ${JSON.stringify(deleteWorkflowOutboundMessageResult)}`,
    );
  }

  processMetadataResultLogging(
    deleteWorkflowOutboundMessageResult,
    logger,
    `Outbound message ${outboundMessageFullName} already deleted`,
    "In field: members - no WorkflowOutboundMessage named",
  );
};
