import { input, util } from "@prismatic-io/spectral";
import { jsonInputClean, valueListInputClean } from "../util";
import {
  connectionInput,
  creationTime,
  datasetId,
  description,
  encryptionConfiguration,
  etag,
  expirationTime,
  friendlyName,
  labels,
  lastModifiedTime,
  location,
  maxResults,
  pageToken,
  projectId,
} from "./common";

export const modelId = input({
  label: "Model ID",
  type: "string",
  clean: util.types.toString,
  comments: "The unique identifier for the model.",
  example: "my_model",
  placeholder: "Enter model ID",
  required: true,
  dataSource: "selectModel",
});

export const defaultTrialId = input({
  label: "Default Trial ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "Output only. The default trialId to use in TVFs when the trialId is not passed in. For single-objective hyperparameter tuning models, this is the best trial ID. For multi-objective hyperparameter tuning models, this is the smallest trial ID among all Pareto optimal trials.",
  required: false,
});

export const modelType = input({
  label: "Model Type",
  type: "string",
  clean: util.types.toString,
  comments: "Output only. Type of the model resource.",
  model: [
    { label: "MODEL_TYPE_UNSPECIFIED", value: "MODEL_TYPE_UNSPECIFIED" },
    { label: "LINEAR_REGRESSION", value: "LINEAR_REGRESSION" },
    { label: "LOGISTIC_REGRESSION", value: "LOGISTIC_REGRESSION" },
    { label: "KMEANS", value: "KMEANS" },
    { label: "MATRIX_FACTORIZATION", value: "MATRIX_FACTORIZATION" },
    { label: "DNN_CLASSIFIER", value: "DNN_CLASSIFIER" },
    { label: "TENSORFLOW", value: "TENSORFLOW" },
    { label: "DNN_REGRESSOR", value: "DNN_REGRESSOR" },
    { label: "XGBOOST", value: "XGBOOST" },
    { label: "BOOSTED_TREE_REGRESSOR", value: "BOOSTED_TREE_REGRESSOR" },
    { label: "BOOSTED_TREE_CLASSIFIER", value: "BOOSTED_TREE_CLASSIFIER" },
    { label: "ARIMA", value: "ARIMA" },
    { label: "AUTOML_REGRESSOR", value: "AUTOML_REGRESSOR" },
    { label: "AUTOML_CLASSIFIER", value: "AUTOML_CLASSIFIER" },
    { label: "PCA", value: "PCA" },
    {
      label: "DNN_LINEAR_COMBINED_CLASSIFIER",
      value: "DNN_LINEAR_COMBINED_CLASSIFIER",
    },
    {
      label: "DNN_LINEAR_COMBINED_REGRESSOR",
      value: "DNN_LINEAR_COMBINED_REGRESSOR",
    },
    { label: "AUTOENCODER", value: "AUTOENCODER" },
    { label: "ARIMA_PLUS", value: "ARIMA_PLUS" },
    { label: "ARIMA_PLUS_XREG", value: "ARIMA_PLUS_XREG" },
    { label: "RANDOM_FOREST_REGRESSOR", value: "RANDOM_FOREST_REGRESSOR" },
    { label: "RANDOM_FOREST_CLASSIFIER", value: "RANDOM_FOREST_CLASSIFIER" },
    { label: "TENSORFLOW_LITE", value: "TENSORFLOW_LITE" },
    { label: "ONNX", value: "ONNX" },
  ],
});

export const optimalTrialIds = input({
  label: "Optimal Trial IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "Output only. For single-objective hyperparameter tuning models, it only contains the best trial. For multi-objective hyperparameter tuning models, it contains all Pareto optimal trials sorted by trialId.",
  example: '["trial_1", "trial_2"]',
  placeholder: "Enter trial IDs",
  clean: valueListInputClean,
});

export const modelReference = input({
  label: "Model Reference",
  type: "code",
  language: "json",
  comments: "Unique identifier for this model.",
  example: JSON.stringify({
    projectId: "string",
    datasetId: "string",
    modelId: "string",
  }),
  clean: jsonInputClean,
  required: true,
});

export const trainingRuns = input({
  label: "Training Runs",
  type: "code",
  language: "json",
  comments:
    "Information for all training runs in increasing order of startTime.",
  example:
    "Reference to the Google docs for this input. An array of https://cloud.google.com/bigquery/docs/reference/rest/v2/models#trainingrun",
  clean: jsonInputClean,
  required: false,
});

export const featureColumns = input({
  label: "Feature Columns",
  type: "code",
  language: "json",
  comments:
    "Output only. Input feature columns for the model inference. If the model is trained with TRANSFORM clause, these are the input of the TRANSFORM clause.",
  example:
    "Reference to the Google docs for this input. An array of https://cloud.google.com/bigquery/docs/reference/rest/v2/StandardSqlField",
  clean: jsonInputClean,
  required: false,
});

export const labelColumns = input({
  label: "Label Columns",
  type: "code",
  language: "json",
  comments:
    "Output only. Label columns that were used to train this model. The output of the model will have a 'predicted_' prefix to these columns.",
  example:
    "Reference to the Google docs for this input. An array of https://cloud.google.com/bigquery/docs/reference/rest/v2/StandardSqlField",
  clean: jsonInputClean,
  required: false,
});

export const transformColumns = input({
  label: "Transform Columns",
  type: "code",
  language: "json",
  comments:
    "Output only. This field will be populated if a TRANSFORM clause was used to train a model. TRANSFORM clause (if used) takes featureColumns as input and outputs transformColumns. transformColumns then are used to train the model.",
  example:
    "Reference to the Google docs for this input. An array of https://cloud.google.com/bigquery/docs/reference/rest/v2/models#transformcolumn",
  clean: jsonInputClean,
  required: false,
});

export const hparamSearchSpaces = input({
  label: "Hparam Search Spaces",
  type: "code",
  language: "json",
  comments:
    "Output only. Trials of a hyperparameter tuning model sorted by trialId.",
  example:
    "Reference to the Google docs for this input. https://cloud.google.com/bigquery/docs/reference/rest/v2/models#hparamsearchspaces",
  clean: jsonInputClean,
  required: false,
});

export const hparamTrials = input({
  label: "Hparam Trials",
  type: "code",
  language: "json",
  comments:
    "Output only. Trials of a hyperparameter tuning model sorted by trialId.",
  example:
    "Reference to the Google docs for this input. An array of https://cloud.google.com/bigquery/docs/reference/rest/v2/models#hparamtuningtrial",
  clean: jsonInputClean,
  required: false,
});

export const remoteModelInfo = input({
  label: "Remote Model Info",
  type: "code",
  language: "json",
  comments: "Output only. Remote model info",
  example: JSON.stringify({
    connection: "string",
    maxBatchingRows: "string",
    endpoint: "string",
    remoteServiceType:
      "One of REMOTE_SERVICE_TYPE_UNSPECIFIED / CLOUD_AI_TRANSLATE_V3 / CLOUD_AI_VISION_V1 / CLOUD_AI_NATURAL_LANGUAGE_V1",
  }),
  clean: jsonInputClean,
  required: false,
});


export const deleteModelInputs = {
  connectionInput,
  projectId,
  datasetId,
  modelId,
};

export const getModelInputs = {
  connectionInput,
  projectId,
  datasetId,
  modelId,
};

export const listModelsInputs = {
  connectionInput,
  projectId,
  datasetId,
  pageToken,
  maxResults,
};

export const updateModelInputs = {
  connectionInput,
  projectId,
  datasetId,
  modelId,
  modelReference,
  etag,
  creationTime,
  lastModifiedTime,
  description,
  friendlyName,
  labels,
  expirationTime,
  location,
  encryptionConfiguration,
  modelType,
  trainingRuns,
  featureColumns,
  labelColumns,
  hparamSearchSpaces,
  defaultTrialId,
  hparamTrials,
  optimalTrialIds,
};
