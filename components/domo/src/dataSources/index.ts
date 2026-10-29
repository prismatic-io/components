import accountDataSources from "./accounts";
import datasetDataSources from "./datasets";
import groupDataSources from "./groups";
import pageDataSources from "./pages";
import projectDataSources from "./projects";
import streamDataSources from "./streams";
import userDataSources from "./users";

export default {
  ...accountDataSources,
  ...datasetDataSources,
  ...groupDataSources,
  ...pageDataSources,
  ...projectDataSources,
  ...streamDataSources,
  ...userDataSources,
};
