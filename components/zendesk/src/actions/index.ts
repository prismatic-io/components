import { rawRequest } from "./misc/rawRequest";
import tickets from "./tickets";
import users from "./users";
import articles from "./articles";
import categories from "./categories";
import articleAttachments from "./articleAttachments";
import search from "./search";
import section from "./section";
import topic from "./topic";
import post from "./posts";
import subscriptions from "./subscriptions";

export default {
  ...tickets,
  ...users,
  ...articles,
  ...categories,
  ...articleAttachments,
  ...search,
  ...section,
  ...topic,
  ...post,
  ...subscriptions,
  rawRequest,
};
