import { action, input, util } from "@prismatic-io/spectral";
import type { HostedToolOutput } from "../../types/tools";

export const createWebSearchTool = action({
  display: {
    label: "Agent: Create Web Search Tool",
    description:
      "Create a web search tool that allows agents to search the web",
  },

  inputs: {
    name: input({
      label: "Tool Name",
      type: "text",
      required: false,
      default: "Web Search",
      comments: "Custom name for the web search tool",
    }),

    searchContextSize: input({
      label: "Search Context Size",
      type: "string",
      required: false,
      default: "medium",
      model: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
      comments: "Amount of context to return from searches",
    }),

    city: input({
      label: "User City",
      type: "text",
      required: false,
      comments: "City for location-aware searches",
    }),

    country: input({
      label: "User Country",
      type: "text",
      required: false,
      comments: "Country for location-aware searches",
    }),

    region: input({
      label: "User Region",
      type: "text",
      required: false,
      comments: "Region/state for location-aware searches",
    }),

    timezone: input({
      label: "User Timezone",
      type: "text",
      required: false,
      comments:
        "Timezone for time-sensitive searches (e.g., 'America/New_York')",
    }),
  },

  perform: async (_, params) => {
    // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration object
    const configuration: any = {};

    if (params.name) {
      configuration.name = util.types.toString(params.name);
    }

    if (params.searchContextSize) {
      configuration.searchContextSize = util.types.toString(
        params.searchContextSize,
      );
    }

    const locationFields = ["city", "country", "region", "timezone"] as const;
    const hasLocation = locationFields.some((field) => params[field]);

    if (hasLocation) {
      configuration.userLocation = { type: "approximate" };
      for (const field of locationFields) {
        if (params[field]) {
          configuration.userLocation[field] = util.types.toString(
            params[field],
          );
        }
      }
    }

    const output: HostedToolOutput = {
      tool: {
        type: "hosted",
        name: "webSearch",
        description: "Search the web for current information",
        configuration:
          Object.keys(configuration).length > 0 ? configuration : undefined,
      },
      toolName: configuration.name || "Web Search",
      toolType: "webSearch",
    };

    return {
      data: output,
    };
  },
});

export const createCodeInterpreterTool = action({
  display: {
    label: "Agent: Create Code Interpreter Tool",
    description:
      "Create a code interpreter tool that allows agents to execute Python code",
  },

  inputs: {
    name: input({
      label: "Tool Name",
      type: "text",
      required: false,
      default: "Code Interpreter",
      comments: "Custom name for the code interpreter tool",
    }),

    containerType: input({
      label: "Container Type",
      type: "string",
      required: false,
      default: "auto",
      model: [
        { label: "Auto", value: "auto" },
        { label: "Specific", value: "specific" },
      ],
      comments: "Container type for code execution",
    }),

    containerId: input({
      label: "Container ID",
      type: "text",
      required: false,
      comments:
        "Specific container ID (only used if containerType is 'specific')",
    }),

    fileIds: input({
      label: "File IDs",
      type: "string",
      collection: "valuelist",
      required: false,
      comments: "Comma-separated list of file IDs to include in the container",
    }),
  },

  perform: async (_, params) => {
    // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration object
    const configuration: any = {};

    if (params.name) {
      configuration.name = util.types.toString(params.name);
    }

    const containerType = params.containerType
      ? util.types.toString(params.containerType)
      : "auto";

    if (containerType === "specific" && params.containerId) {
      configuration.container = util.types.toString(params.containerId);
    } else if (containerType === "auto" || !params.containerId) {
      const container: { type: "auto"; file_ids?: string[] } = { type: "auto" };

      if (params.fileIds) {
        const fileIdsStr = util.types.toString(params.fileIds);
        const fileIds = fileIdsStr
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);

        if (fileIds.length > 0) {
          container.file_ids = fileIds;
        }
      }

      configuration.container = container;
    }

    const output: HostedToolOutput = {
      tool: {
        type: "hosted",
        name: "codeInterpreter",
        description:
          "Execute Python code for calculations, data analysis, and file operations",
        configuration:
          Object.keys(configuration).length > 0 ? configuration : undefined,
      },
      toolName: configuration.name || "Code Interpreter",
      toolType: "codeInterpreter",
    };

    return {
      data: output,
    };
  },
});

export const createFileSearchTool = action({
  display: {
    label: "Agent: Create File Search Tool",
    description:
      "Create a file search tool that searches through vector stores",
  },

  inputs: {
    name: input({
      label: "Tool Name",
      type: "text",
      required: false,
      default: "File Search",
      comments: "Custom name for the file search tool",
    }),

    vectorStoreIds: input({
      label: "Vector Store IDs",
      type: "string",
      collection: "valuelist",
      required: true,
      comments: "Comma-separated list of vector store IDs to search",
    }),

    maxNumResults: input({
      label: "Max Results",
      type: "string",
      required: false,
      comments: "Maximum number of results to return",
    }),

    includeSearchResults: input({
      label: "Include Search Results",
      type: "boolean",
      required: false,
      default: "true",
      comments: "Include search results in the LLM output",
    }),

    rankingAlgorithm: input({
      label: "Ranking Algorithm",
      type: "text",
      required: false,
      comments: "Algorithm for ranking search results",
    }),

    scoreThreshold: input({
      label: "Score Threshold",
      type: "string",
      required: false,
      comments: "Minimum score threshold for results (0-1)",
    }),
  },

  perform: async (_, params) => {
    // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration object
    const configuration: any = {};

    if (params.name) {
      configuration.name = util.types.toString(params.name);
    }

    const vectorStoreIdsStr = util.types.toString(params.vectorStoreIds);
    configuration.vectorStoreIds = vectorStoreIdsStr
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (params.maxNumResults) {
      configuration.maxNumResults = Number.parseInt(
        util.types.toString(params.maxNumResults),
        10,
      );
    }

    if (params.includeSearchResults !== undefined) {
      configuration.includeSearchResults = util.types.toBool(
        params.includeSearchResults,
      );
    }

    const hasRankingOptions = params.rankingAlgorithm || params.scoreThreshold;
    if (hasRankingOptions) {
      configuration.rankingOptions = {};
      if (params.rankingAlgorithm) {
        configuration.rankingOptions.algorithm = util.types.toString(
          params.rankingAlgorithm,
        );
      }
      if (params.scoreThreshold) {
        configuration.rankingOptions.scoreThreshold = Number.parseFloat(
          util.types.toString(params.scoreThreshold),
        );
      }
    }

    const output: HostedToolOutput = {
      tool: {
        type: "hosted",
        name: "fileSearch",
        description: "Search through vector stores for relevant information",
        configuration,
      },
      toolName: configuration.name || "File Search",
      toolType: "fileSearch",
    };

    return {
      data: output,
    };
  },
});

export const createImageGenerationTool = action({
  display: {
    label: "Agent: Create Image Generation Tool",
    description:
      "Create an image generation tool that allows agents to generate images",
  },

  inputs: {
    name: input({
      label: "Tool Name",
      type: "text",
      required: false,
      default: "Image Generation",
      comments: "Custom name for the image generation tool",
    }),

    background: input({
      label: "Background",
      type: "string",
      required: false,
      default: "auto",
      model: [
        { label: "Transparent", value: "transparent" },
        { label: "Opaque", value: "opaque" },
        { label: "Auto", value: "auto" },
      ],
      comments: "Background type for generated images",
    }),

    inputFidelity: input({
      label: "Input Fidelity",
      type: "string",
      required: false,
      model: [
        { label: "High", value: "high" },
        { label: "Low", value: "low" },
      ],
      comments: "Input fidelity level",
    }),

    model: input({
      label: "Model",
      type: "text",
      required: false,
      default: "gpt-image-1",
      comments: "Model to use for generation",
    }),

    moderation: input({
      label: "Moderation",
      type: "string",
      required: false,
      default: "auto",
      model: [
        { label: "Auto", value: "auto" },
        { label: "Low", value: "low" },
      ],
      comments: "Moderation level for content filtering",
    }),

    outputCompression: input({
      label: "Output Compression",
      type: "string",
      required: false,
      comments: "Compression level 0-100 (higher = more compression)",
    }),

    outputFormat: input({
      label: "Output Format",
      type: "string",
      required: false,
      default: "png",
      model: [
        { label: "PNG", value: "png" },
        { label: "WebP", value: "webp" },
        { label: "JPEG", value: "jpeg" },
      ],
      comments: "Image output format",
    }),

    partialImages: input({
      label: "Partial Images",
      type: "string",
      required: false,
      comments: "Number of partial images to generate",
    }),

    quality: input({
      label: "Quality",
      type: "string",
      required: false,
      default: "auto",
      model: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Auto", value: "auto" },
      ],
      comments: "Quality level for generated images",
    }),

    size: input({
      label: "Size",
      type: "string",
      required: false,
      default: "auto",
      model: [
        { label: "Square (1024x1024)", value: "1024x1024" },
        { label: "Portrait (1024x1536)", value: "1024x1536" },
        { label: "Landscape (1536x1024)", value: "1536x1024" },
        { label: "Auto", value: "auto" },
      ],
      comments: "Image dimensions",
    }),
  },

  perform: async (_, params) => {
    // biome-ignore lint/suspicious/noExplicitAny: Dynamic configuration object
    const configuration: any = {};

    if (params.name) {
      configuration.name = util.types.toString(params.name);
    }
    if (params.background) {
      configuration.background = util.types.toString(params.background);
    }
    if (params.inputFidelity) {
      configuration.inputFidelity = util.types.toString(params.inputFidelity);
    }
    if (params.model) {
      configuration.model = util.types.toString(params.model);
    }
    if (params.moderation) {
      configuration.moderation = util.types.toString(params.moderation);
    }
    if (params.outputCompression) {
      configuration.outputCompression = Number.parseInt(
        util.types.toString(params.outputCompression),
        10,
      );
    }
    if (params.outputFormat) {
      configuration.outputFormat = util.types.toString(params.outputFormat);
    }
    if (params.partialImages) {
      configuration.partialImages = Number.parseInt(
        util.types.toString(params.partialImages),
        10,
      );
    }
    if (params.quality) {
      configuration.quality = util.types.toString(params.quality);
    }
    if (params.size) {
      configuration.size = util.types.toString(params.size);
    }

    const output: HostedToolOutput = {
      tool: {
        type: "hosted",
        name: "imageGeneration",
        description: "Generate images from text descriptions",
        configuration:
          Object.keys(configuration).length > 0 ? configuration : undefined,
      },
      toolName: configuration.name || "Image Generation",
      toolType: "imageGeneration",
    };

    return {
      data: output,
    };
  },
});
