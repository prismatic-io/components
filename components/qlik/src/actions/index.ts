import app from "./app";
import data_asset from "./data_asset";
import datafiles from "./datafiles";
import datasets from "./datasets";
import datastore from "./datastore";
import rawRequest from "./rawRequest";
import report from "./report";
import spaces from "./spaces";
import users from "./users";

export default {
  ...app,
  ...data_asset,
  ...datafiles,
  ...datasets,
  ...datastore,
  rawRequest,
  ...report,
  ...spaces,
  ...users,
};
