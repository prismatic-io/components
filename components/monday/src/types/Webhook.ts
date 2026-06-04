export interface ChallengeRequest {
  challenge?: string;
}

export interface WebhookEvent {
  userId: number;
  boardId: number;
  pulseId: number;
  pulseName: string;
  groupId: string;
  groupName: string;
  type: string;
  triggerTime: string;
  subscriptionId: number;
  triggerUuid: string;
  parentItemId?: number;
  parentItemBoardId?: number;
  columnId?: string;
  columnType?: string;
  columnTitle?: string;
  value?: Record<string, unknown>;
  previousValue?: Record<string, unknown>;
  changedAt?: string;
}

export interface CreateWebhookResponse {
  create_webhook: {
    id: string;
    board_id: string;
  };
}

export interface WebhookNode {
  id: string;
  board_id: string;
  config: string;
  event: string;
}

export interface ListWebhooksResponse {
  webhooks: WebhookNode[];
}
