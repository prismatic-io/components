import { toOptionalString } from "../util";
import { connectionInput, MarketplaceIds, notificationType } from "./common";
import {
  createdSince,
  createdUntil,
  feedTypes,
  processingStatuses,
} from "./feeds";
import {
  CreatedAfter,
  CreatedBefore,
  LastUpdatedAfter,
  LastUpdatedBefore,
} from "./orders";

export const selectOrderInputs = {
  connection: connectionInput,
  createdAfter: CreatedAfter,
  createdBefore: CreatedBefore,
  lastUpdatedAfter: LastUpdatedAfter,
  lastUpdatedBefore: LastUpdatedBefore,
  marketplaceIds: MarketplaceIds,
};

export const selectFeedInputs = {
  connection: connectionInput,
  feedTypes: feedTypes,
  marketplaceIds: { ...MarketplaceIds, required: false },
  processingStatuses: { ...processingStatuses, clean: toOptionalString },
  createdSince,
  createdUntil,
};

export const selectDestinationsInputs = {
  connection: connectionInput,
};

export const selectSubscriptionInputs = {
  connection: connectionInput,
  notificationType,
};
