import { action, outputSchema, util } from "@prismatic-io/spectral";
import {
  convertResultToGenericObject,
  executeAction,
  getObjectFromArray,
} from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import { getProjectExamplePayload } from "../../examplePayloads";
import { OBJECT_PROJECT } from "../../constants";
import { getProjectInputs } from "../../inputs";
import { getProjectOutputSchema } from "../../outputSchemas";
export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieves a project by record number.",
  },
  performSafety: "safe",
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getProject = new Functions.Common.Read();
    getProject.objectName = OBJECT_PROJECT;
    getProject.fields = fieldsInput;
    getProject.keys = [util.types.toInt(recordNoInput)];
    const result = await executeAction(connection, getProject);
    const { _data: projectsArray } = convertResultToGenericObject(result);
    return {
      data: getObjectFromArray(projectsArray),
    };
  },
  inputs: getProjectInputs,
  examplePayload: getProjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProjectOutputSchema,
  }),
  examplePerform: async () => ({ data: getProjectExamplePayload.data }),
});
