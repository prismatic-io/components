export type MetricIntakeType = 0 | 1 | 2 | 3;
interface MetricResource {
  name?: string;
  type?: string;
}
interface MetricPoint {
  timestamp?: number;
  value?: number;
}
interface MetricOrigin {
  metric_type?: number;
  product?: number;
  service?: number;
}
interface MetricMetadata {
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
  payload: string | null;
  encode_as?: WebhookEncodeAs;
}
export interface RegisteredWebhookState {
  webhookName: string;
  webhookUrl: string;
}
