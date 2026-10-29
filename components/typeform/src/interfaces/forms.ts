export interface Form {
  id: string;
  title: string;
  language: string;
  fields: Record<string, unknown>[];
  hidden: string[];
  variables: FormVariables;
  welcome_screens: FormWelcomeScreen[];
  thankyou_screens: FormThankyouScreen[];
  logic: FormLogic[];
  theme: FormTheme;
  workspace: FormTheme;
  _links: FormLinks;
  settings: FormSettings;
  cui_settings: FormCuiSettings;
}

export interface FormLinks {
  display: string;
}

export interface FormCuiSettings {
  avatar: string;
  is_typing_emulation_disabled: boolean;
  typing_emulation_speed: string;
}

export interface FormLogic {
  type: string;
  ref: string;
  actions: FormAction[];
}

export interface FormAction {
  action: string;
  details: FormDetails;
  condition: FormCondition;
}

export interface FormCondition {
  op: string;
  vars: FormVar[];
}

export interface FormVar {
  type: string;
  value: Record<string, unknown>;
}

export interface FormDetails {
  to: FormTarget;
  target: FormTarget;
  value: FormValue;
}

export interface FormTarget {
  type: string;
  value: string;
}

export interface FormValue {
  type: string;
}

export interface FormSettings {
  language: string;
  is_public: boolean;
  autosave_progress: boolean;
  progress_bar: string;
  show_progress_bar: boolean;
  show_typeform_branding: boolean;
  show_time_to_complete: boolean;
  show_number_of_submissions: boolean;
  show_cookie_consent: boolean;
  show_question_number: boolean;
  show_key_hint_on_choices: boolean;
  hide_navigation: boolean;
  meta: FormMeta;
  redirect_after_submit_url: string;
  google_analytics: string;
  facebook_pixel: string;
  google_tag_manager: string;
  milestones: FormMilestone[];
  enrichment_in_renderer: FormEnrichmentInRenderer;
}

export interface FormEnrichmentInRenderer {
  toggle: boolean;
  active: boolean;
}

export interface FormMeta {
  title: string;
  allow_indexing: boolean;
  description: string;
  image: FormTheme;
}

export interface FormTheme {
  href: string;
}

export interface FormMilestone {
  field_ref: string;
  status: string;
  reason: string;
}

export interface FormThankyouScreen {
  ref: string;
  title: string;
  type: string;
  properties: FormThankyouScreenProperties;
  attachment: FormAttachment;
  layout: FormLayout;
}

export interface FormAttachment {
  type: string;
  href: FormHref;
  scale: number;
  properties: FormAttachmentProperties;
}

export interface FormHref {
  image: FormPexels;
  Pexels: FormPexels;
  Vimeo: FormPexels;
  YouTube: FormPexels;
}

export interface FormPexels {
  value: string;
}

export interface FormAttachmentProperties {
  description: string;
}

export interface FormLayout {
  type: string;
  placement: string;
  attachment: FormAttachment;
  viewport_overrides: FormViewportOverrides;
}

export interface FormViewportOverrides {
  small: FormLarge;
  large: FormLarge;
}

export interface FormLarge {
  type: string;
  placement: string;
}

export interface FormThankyouScreenProperties {
  show_button: boolean;
  button_text: string;
  button_mode: string;
  redirect_url: string;
  share_icons: boolean;
}

export interface FormVariables {
  score: number;
  price: number;
}

export interface FormWelcomeScreen {
  ref: string;
  title: string;
  properties: FormWelcomeScreenProperties;
  attachment: FormAttachment;
  layout: FormLayout;
}

export interface FormWelcomeScreenProperties {
  description: string;
  show_button: boolean;
  button_text: string;
}
