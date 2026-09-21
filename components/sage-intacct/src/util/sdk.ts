import type { Connection } from "@prismatic-io/spectral";
import type { IFunction } from "@intacct/intacct-sdk/dist/Functions";
import type { Result } from "@intacct/intacct-sdk/dist/Xml/Response";
import { createSdkClient } from "../client";
export const executeAction = async (
  connection: Connection,
  action: IFunction,
) => {
  const client = createSdkClient(connection);
  const actionResponse = await client.execute(action);
  return actionResponse.getResult();
};
export function convertResultToGenericObject(
  resultInstance: Result,
): Record<string, unknown> {
  const jsonString = JSON.stringify(resultInstance);
  const genericObject: Record<string, unknown> = JSON.parse(jsonString);
  return genericObject;
}
export const assignParametersToObject = (
  // biome-ignore lint/suspicious/noExplicitAny: For backwards compatibility
  objectToModify: any, // biome-ignore lint/suspicious/noExplicitAny: For backwards compatibility
  objectAttributes: Record<string, any>,
) => {
  for (const key in objectAttributes) {
    const value = objectAttributes[key];
    switch (typeof value) {
      case "string":
        if (value.length > 0) {
          objectToModify[key] = value;
        }
        break;
      case "number":
        if (value > 0) {
          objectToModify[key] = value;
        }
        break;
      case "object":
        if (Array.isArray(value) && value.length > 0) {
          objectToModify[key] = value;
        }
        break;
      case "boolean":
        objectToModify[key] = value;
        break;
      default:
        break;
    }
  }
};
export const getObjectFromArray = (possibleArray: unknown) => {
  if (Array.isArray(possibleArray)) {
    return possibleArray[0];
  }
  return null;
};
