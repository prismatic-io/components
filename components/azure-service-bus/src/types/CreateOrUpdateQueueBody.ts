import type { EntityStatus } from "./EntityStatus";

export interface CreateOrUpdateQueueBody {
  properties?: {
    autoDeleteOnIdle?: string;
    deadLetteringOnMessageExpiration?: boolean;
    defaultMessageTimeToLive?: string;
    duplicateDetectionHistoryTimeWindow?: string;
    enableBatchedOperations?: boolean;
    enableExpress?: boolean;
    enablePartitioning?: boolean;
    forwardDeadLetteredMessagesTo?: string;
    forwardTo?: string;
    lockDuration?: string;
    maxDeliveryCount?: number;
    maxMessageSizeInKilobytes?: number;
    maxSizeInMegabytes?: number;
    requiresDuplicateDetection?: boolean;
    requiresSession?: boolean;
    status?: EntityStatus;
  };
}
