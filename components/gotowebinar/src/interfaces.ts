export interface ClientProps {
  token: string;
  organizerKey: string;
  baseUrl: string;
}

export interface UserSubscription {
  callbackUrl: string;
  eventName: string;
  eventVersion: string;
  product: string;
  webhookKey: string;
  userSubscriptionKey: string;
  userSubscriptionState: string;
  activationState: string;
  createTime: string;
}

export interface UserSubscriptionResponse {
  _embedded: {
    userSubscriptions: UserSubscription[];
  };
}

export interface Webinar {
  webinarKey: string;
  webinarID: string;
  organizerKey: string;
  accountKey: string;
  subject: string;
  description: string;
  timeZone: string;
  approvalType: string;
  registrationUrl: string;
  impromptu: boolean;
  isPasswordProtected: boolean;
  recurrenceType: string;
  experienceType: string;
}

export interface Webhook {
  callbackUrl: string;
  eventName: string;
  eventVersion: string;
  userSubscriptionKey: string;
  product: string;
  webhookKey: string;
  state: string;
  createTime: string;
}

export interface GoToWebinarResponse<T> {
  _embedded: Record<string, T[]>;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface Registrant {
  lastName: string;
  email: string;
  firstName: string;
  registrantKey: {
    s: number;
    e: number;
    c: number[];
  };
  registrationDate: string;
  status: "APPROVED" | "PENDING" | "REJECTED"; 
  joinUrl: string;
  timeZone: string;
}

export interface PaginatedResponse<T> {
  data: T[] | T;
  total: number;
  page: number;
  limit: number;
  pageSize: number;
}
