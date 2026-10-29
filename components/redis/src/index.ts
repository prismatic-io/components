import { component } from "@prismatic-io/spectral";
import get from "./actions/get";
import getTime from "./actions/getTime";
import keys from "./actions/keys";
import ping from "./actions/ping";
import set from "./actions/set";
import flushAll from "./actions/flushAll";
import deleteKey from "./actions/deleteKey";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "redis",
  documentationUrl: "https://prismatic.io/docs/components/redis/",
  public: true,
  display: {
    label: "Redis",
    category: "Data Platforms",
    description: "Manage items in a Redis database",
    iconPath: "icon.png",
  },
  actions: { get, getTime, keys, ping, set, flushAll, deleteKey },
  connections,
  hooks: {
    error: handleErrors,
  },
});
