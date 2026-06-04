import type { EntityStatus } from "./EntityStatus";
import type { SBClientAffineProperties } from "./SBClientAffineProperties";

export interface CreateOrUpdateSubscriptionsBody {
  properties?: {
    autoDeleteOnIdle?: string;
    clientAffineProperties?: SBClientAffineProperties;
    deadLetteringOnFilterEvaluationExceptions?: boolean;
    deadLetteringOnMessageExpiration?: boolean;
    defaultMessageTimeToLive?: string;
    duplicateDetectionHistoryTimeWindow?: string;
    enableBatchedOperations?: boolean;
    forwardDeadLetteredMessagesTo?: string;
    forwardTo?: string;
    isClientAffine?: boolean;
    lockDuration?: string;
    maxDeliveryCount?: number;
    requiresSession?: boolean;
    status?: EntityStatus;
  };
}
