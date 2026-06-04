







export type MetricIntakeType = 0 | 1 | 2 | 3;


export interface MetricResource {
  name?: string;
  type?: string;
}


export interface MetricPoint {
  timestamp?: number;
  value?: number;
}


export interface MetricOrigin {
  metric_type?: number;
  product?: number;
  service?: number;
}


export interface MetricMetadata {
  origin?: MetricOrigin;
}


export interface MetricSeries {
  metric: string;
  points: MetricPoint[];
  type?: MetricIntakeType;
  interval?: number;
  unit?: string;
  tags?: string[];
  resources?: MetricResource[];
  source_type_name?: string;
  metadata?: MetricMetadata;
}


export interface SubmitMetricsPayload {
  series: MetricSeries[];
}


export interface SubmitMetricsResponse {
  errors: string[];
}


export interface ListMetricsResponse {
  
  metrics: string[];
  
  from: string;
}


export interface SearchMetricsResponse {
  results: {
    
    metrics: string[];
  };
}






export type WebhookEncodeAs = "json" | "form";


export interface WebhooksIntegration {
  name: string;
  url: string;
  custom_headers: string | null;
  encode_as?: WebhookEncodeAs;
  payload: string | null;
  auth_method_id?: string | null;
}


export interface WebhooksIntegrationCustomVariable {
  name: string;
  value?: string;
  is_secret: boolean;
}


export interface CreateCustomVariablePayload {
  name: string;
  value: string;
  is_secret: boolean;
}


export interface UpdateCustomVariablePayload {
  name?: string;
  value?: string;
  is_secret?: boolean;
}









export interface DatadogWebhookPayload {
  ALERT_ID?: string;
  ALERT_METRIC?: string;
  ALERT_QUERY?: string;
  ALERT_SCOPE?: string;
  ALERT_STATUS?: string;
  ALERT_TITLE?: string;
  ALERT_TRANSITION?: string;
  ALERT_TYPE?: string;
  DATE?: string;
  EVENT_MSG?: string;
  EVENT_TITLE?: string;
  EVENT_TYPE?: string;
  HOSTNAME?: string;
  ID?: string;
  LAST_UPDATED?: string;
  LINK?: string;
  ORG_ID?: string;
  ORG_NAME?: string;
  TAGS?: string;
  [key: string]: unknown;
}
