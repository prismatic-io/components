import { input, util } from "@prismatic-io/spectral";

export const packageInput = input({
  label: "Package",
  type: "string",
  comments: "The package id to deploy.",
  required: true,
  example: "pkg_123abc",
  placeholder: "Enter package ID",
  clean: util.types.toString,
  dataSource: "selectPackage",
});

export const targets = input({
  label: "Targets",
  type: "string",
  comments: "Comma-delimitted Device IDs or Group IDs.",
  required: true,
  example: "grp_123abc,dvc_123abc",
  placeholder: "Enter device/group IDs (comma-separated)",
  clean: util.types.toString,
});

export const createDeploymentInputs = {
  packageInput,
  targets,
};
