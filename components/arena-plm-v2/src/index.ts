import { component } from "@prismatic-io/spectral";
import * as actions from "./actions";
import { connections } from "./connections";
import {
  categoriesPicklist,
  categoryAttributesObjectSelection,
  changeCategoryRoutingsPicklist,
  exportsPicklist,
  integrationsPicklist,
  notificationJsonForm,
  numberSequencePrefixesPicklist,
  outboundEventIntegrationsPicklist,
  qualityProcessTemplatesPicklist,
} from "./dataSources";
import { pollChangesTrigger } from "./triggers";
export default component({
  key: "arena-plm-v2",
  public: true,
  display: {
    label: "Arena Solutions",
    description: "Connect and sync data with Arena Solutions PLM system",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  documentationUrl: "https://prismatic.io/docs/components/arena-plm-v2/",
  connections,
  actions,
  dataSources: {
    categoriesPicklist,
    categoryAttributesObjectSelection,
    numberSequencePrefixesPicklist,
    changeCategoryRoutingsPicklist,
    outboundEventIntegrationsPicklist,
    qualityProcessTemplatesPicklist,
    exportsPicklist,
    integrationsPicklist,
    notificationJsonForm,
  },
  triggers: { pollChangesTrigger },
});
