import { dataSource } from "@prismatic-io/spectral";
import {
  selectProjectExamplePayload,
  selectProjectsExamplePayload,
} from "../examplePayloads";
import { selectProjectInputs, selectProjectsInputs } from "../inputs";
import { getProjects } from "../util";

const selectProject = dataSource({
  display: {
    label: "Select Project",
    description: "Select a project.",
  },
  inputs: selectProjectInputs,
  perform: async (_context, params) => {
    const result = await getProjects(params.connection);
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectProjectExamplePayload,
});

const selectProjects = dataSource({
  display: {
    label: "Select Projects",
    description: "Select one or many projects.",
  },
  inputs: selectProjectsInputs,
  perform: async (_context, params) => {
    const result = await getProjects(params.connection);
    return {
      result: result.map((projectElement) => ({
        object: projectElement,
      })),
    };
  },
  dataSourceType: "objectSelection",
  examplePayload: selectProjectsExamplePayload,
});

export default {
  selectProject,
  selectProjects,
};
