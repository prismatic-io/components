import { projectSchema } from "./common";

export const findProjectOutputSchema = {
  type: "array",
  items: projectSchema,
};

export const listProjectsOutputSchema = {
  type: "array",
  items: projectSchema,
};

export const searchProjectsOutputSchema = {
  type: "array",
  items: projectSchema,
};

export const getProjectOutputSchema = projectSchema;
