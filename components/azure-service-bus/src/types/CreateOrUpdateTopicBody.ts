import type { EntityStatus } from "./EntityStatus";

export interface CreateOrUpdateTopicBody {
  properties?: {
    autoDeleteOnIdle?: string;
    defaultMessageTimeToLive?: string;
    duplicateDetectionHistoryTimeWindow?: string;
    enableBatchedOperations?: boolean;
    enableExpress?: boolean;
    enablePartitioning?: boolean;
    maxMessageSizeInKilobytes?: number;
    maxSizeInMegabytes?: number;
    requiresDuplicateDetection?: boolean;
    status?: EntityStatus;
    supportOrdering?: boolean;
  };
}
