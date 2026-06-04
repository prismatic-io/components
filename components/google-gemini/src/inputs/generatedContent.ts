import { ImagePromptLanguage } from "@google/genai";
import { input } from "@prismatic-io/spectral";
import { cleanNumber, cleanString } from "../util";
import {
  connection,
  extraParameters,
  maxOutputTokens,
  model,
  prompt,
  safetySettings,
  temperature,
  topK,
  topP,
} from "./common";

const numberOfImages = input({
  label: "Number of Images",
  type: "string",
  required: false,
  comments: "The total count of images the model should produce per request.",
  placeholder: "Enter number of images",
  example: "1",
  clean: cleanNumber,
});

const language = input({
  label: "Language",
  type: "string",
  required: false,
  comments: "The locale used to interpret the prompt and generate content.",
  example: "en",
  model: [
    { label: "Auto", value: ImagePromptLanguage.auto },
    { label: "English", value: ImagePromptLanguage.en },
    { label: "Japanese", value: ImagePromptLanguage.ja },
    { label: "Korean", value: ImagePromptLanguage.ko },
    { label: "Hindi", value: ImagePromptLanguage.hi },
  ],
  clean: (value: unknown) => {
    return cleanString(value) as ImagePromptLanguage | undefined;
  },
});

const aspectRatio = input({
  label: "Aspect Ratio",
  type: "string",
  required: false,
  comments:
    "The width-to-height proportion for the generated media output (e.g., 16:9, 1:1).",
  example: "16:9",
  placeholder: "Enter aspect ratio",
  clean: cleanString,
});

const fps = input({
  label: "FPS",
  type: "string",
  required: false,
  comments: "The frames per second for the generated video output.",
  placeholder: "Enter frames per second",
  example: "30",
  clean: cleanNumber,
});

const numberOfVideos = input({
  label: "Number of Videos",
  type: "string",
  required: false,
  comments: "The total count of videos the model should produce per request.",
  placeholder: "Enter number of videos",
  example: "1",
  clean: cleanNumber,
});

const personGeneration = input({
  label: "Person Generation",
  type: "string",
  required: false,
  comments:
    "Controls whether the model can generate videos containing people and restricts age groups.",
  example: "dont_allow",
  model: [
    { label: "Don't Allow", value: "dont_allow" },
    { label: "Allow Adult", value: "allow_adult" },
  ],
  clean: cleanString,
});

const resolution = input({
  label: "Resolution",
  type: "string",
  required: false,
  comments:
    "The pixel dimensions (width x height) for the generated video output.",
  example: "1080p",
  model: [
    { label: "1280x720", value: "1280x720" },
    { label: "1920x1080", value: "1920x1080" },
  ],
  clean: cleanString,
});

const durationSeconds = input({
  label: "Duration Seconds",
  type: "string",
  required: false,
  comments: "The length of the generated video clip in seconds.",
  example: "10",
  placeholder: "Enter duration in seconds",
  clean: cleanNumber,
});

export const generateTextInputs = {
  prompt,
  model,
  temperature,
  maxOutputTokens,
  topK,
  topP,
  safetySettings,
  extraParameters,
  connection,
};

export const generateImageInputs = {
  model,
  prompt: {
    ...prompt,
    comments: "Text prompt that typically describes the images to output.",
  },
  numberOfImages,
  language,
  aspectRatio,
  extraParameters,
  connection,
};

export const generateVideoInputs = {
  model,
  prompt: {
    ...prompt,
    comments: "Text prompt that typically describes the video to output.",
  },
  fps,
  numberOfVideos,
  personGeneration,
  resolution,
  aspectRatio: {
    ...aspectRatio,
    model: [
      { label: "16:9 (landscape)", value: "16:9" },
      { label: "9:16 (portrait)", value: "9:16" },
    ],
  },
  durationSeconds,
  extraParameters,
  connection,
};
