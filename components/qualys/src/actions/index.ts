import assetRiskData from "./assetRiskData";
import assets from "./assets";
import assetTags from "./assetTags";
import misc from "./misc";
import remediationTickets from "./remediationTickets";
import scans from "./scans";
import tags from "./tags";
export default {
  ...assets,
  ...assetRiskData,
  ...tags,
  ...assetTags,
  ...scans,
  ...remediationTickets,
  ...misc,
};
