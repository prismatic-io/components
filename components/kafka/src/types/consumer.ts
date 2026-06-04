export interface PartitionLag {
  partition: number;
  committedOffset: string;
  currentOffset: string;
  lag: string;
}

export interface TopicLag {
  topic: string;
  partitions: PartitionLag[];
  totalLag: string;
}

export interface ConsumerGroupMember {
  memberId: string;
  clientId: string;
  clientHost: string;
}

export interface ConsumerGroupStatus {
  groupId: string;
  state: string;
  protocolType: string;
  protocol: string;
  members: ConsumerGroupMember[];
  topicsWithOffsets: TopicLag[]; 
  totalLag: string;
}

export interface KafkaMessage {
  topic: string;
  partition: number;
  offset: string;
  key: string | null;
  value: string | null;
  timestamp: string;
  headers?: Record<string, unknown>;
}
