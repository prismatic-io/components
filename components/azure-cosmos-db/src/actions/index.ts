import * as databases from "./databases";
import * as collections from "./collections";
import * as documents from "./documents";

export default {
  ...databases,
  ...collections,
  ...documents,
};
