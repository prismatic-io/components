import { component } from "@prismatic-io/spectral";
import { getMessage } from "./actions/getMessage";
import { publishMessage } from "./actions/publishMessage";
import { rejectMessage } from "./actions/rejectMessage";
import { acknowledgeMessage } from "./actions/acknowledgeMessage";
import { checkConnection } from "./actions/checkConnection";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import connections from "./connections";

export default component({
  key: "amqp",
  documentationUrl: "https://prismatic.io/docs/components/amqp/",
  public: true,
  display: {
    label: "AMQP",
    description: "Send and receive messages on an AMQP-based message broker",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions: {
    getMessage,
    publishMessage,
    rejectMessage,
    acknowledgeMessage,
    checkConnection,
  },
  connections,
  hooks: {
    error: handleErrors,
  },
});
