import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import dataSources from "./dataSources";
import rawRequest from "./actions/rawRequest";
import { getServers, listServers, editServers } from "./actions/servers";
import { sendSingleEmail } from "./actions/sendSingleEmail";
import { sendBatchEmail } from "./actions/sendBatchEmail";
import { sendEmailWithTemplate } from "./actions/sendEmailWithTemplate";
import { sendBatchEmailWithTemplate } from "./actions/sendBatchEmailWithTemplate";
import triggers from "./triggers";
import {
  getServer,
  editServer,
  createServer,
  deleteServer,
} from "./actions/server";
import {
  createWebhook,
  getWebhook,
  listWebhooks,
  editWebhook,
  deleteWebhook,
  deleteInstancedWebhooks,
} from "./actions/webhook";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "postmark",
  documentationUrl: "https://prismatic.io/docs/components/postmark/",
  public: true,
  display: {
    label: "Postmark",
    category: "Application Connectors",
    description:
      "Send transactional emails and manage delivery settings in Postmark.",
    iconPath: "icon.png",
  },
  actions: {
    sendSingleEmail,
    sendBatchEmail,
    sendEmailWithTemplate,
    sendBatchEmailWithTemplate,
    createWebhook,
    getWebhook,
    listWebhooks,
    editWebhook,
    deleteWebhook,
    deleteInstancedWebhooks,
    getServer,
    editServer,
    getServers,
    createServer,
    editServers,
    listServers,
    deleteServer,
    rawRequest,
  },
  triggers,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
