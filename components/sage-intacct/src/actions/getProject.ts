import { action, util } from "@prismatic-io/spectral";
import { connection, fieldsInput, recordNoInput } from "../inputs";
import {
  convertResultToGenericObject,
  executeAction,
  getObjectFromArray,
} from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import { getProjectPayload } from "../examplePayloads/getProjectPayload";

export const getProject = action({
  display: {
    label: "Get Project",
    description: "Retrieve a project by record number.",
  },
  perform: async (_context, { connection, fieldsInput, recordNoInput }) => {
    const getProject = new Functions.Common.Read();
    getProject.objectName = "PROJECT";
    getProject.fields = fieldsInput;
    getProject.keys = [util.types.toInt(recordNoInput)];
    const result = await executeAction(connection, getProject);
    const { _data: projectsArray } = convertResultToGenericObject(result);
    return {
      data: getObjectFromArray(projectsArray),
    };
  },
  inputs: {
    connection,
    fieldsInput,
    recordNoInput: {
      ...recordNoInput,
      comments: `${recordNoInput.comments} of the project to retrieve.`,
      dataSource: "selectProject",
    },
  },
  examplePayload: getProjectPayload,
});
