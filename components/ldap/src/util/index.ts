import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { Attribute, Change, type Client } from "ldapts";
import connections from "../connections";

export const validateConnection = (connection: Connection): void => {
  const connectionKeys = connections.map((c) => c.key);
  if (!connectionKeys.includes(connection.key)) {
    throw new ConnectionError(
      connection,
      `Unsupported connection ${connection.key}.`,
    );
  }
};

export const cleanAttributesList = (value: unknown): string[] => {
  const allAttributes = ["*"];
  if (Array.isArray(value)) {
    return value.length > 0 ? value : allAttributes;
  }
  return allAttributes;
};

export const cleanStringInput = (value: unknown) =>
  value ? util.types.toString(value) : undefined;

export const getRootDn = async (client: Client): Promise<string> => {
  const { searchEntries: searchRootEntries } = await client.search("", {
    scope: "base",
    attributes: ["namingContexts"],
  });

  if (searchRootEntries.length === 0) {
    throw new Error("Unable to retrieve root DN.");
  }

  const [rootDN] = searchRootEntries;
  const namingContexts = rootDN.namingContexts;

  if (!namingContexts || namingContexts.length === 0) {
    throw new Error("Unable to retrieve naming contexts.");
  }

  const rootDn = Array.isArray(namingContexts)
    ? namingContexts[0]
    : namingContexts;
  if (typeof rootDn !== "string") {
    throw new Error("Unsupported naming context found.");
  }

  return rootDn;
};

const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanChanges = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      if (typeof value === "string") {
        
        JSON.parse(value);
      }
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      const changesMap = object.map((change) => {
        const modificationKey = Object.keys(change.modification)[0];
        return new Change({
          operation: change.operation,
          modification: new Attribute({
            type: Object.keys(change.modification)[0],
            values: [change.modification[modificationKey]],
          }),
        });
      });
      return changesMap;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};

export const formatPassword = (password: string) => {
  const quotedPassword = `"${password}"`;
  return Buffer.from(quotedPassword, "utf16le");
};
