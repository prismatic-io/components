import {
  createConnection,
  createHarness,
} from "@prismatic-io/spectral/dist/testing";
import { describe, test, expect } from "vitest";
import myComponent from ".";
import { openAiApiKey as openaiApiKey } from "./connections";
import type {
  AgentConfigData,
  PendingApproval,
  ApprovalToolOutput,
  UploadFileResponse,
  ListFilesResponse,
  RetrieveFileResponse,
  DeleteFileResponse,
  FileObject,
} from "./types";

interface CreateAgentResponse {
  data: AgentConfigData;
}

interface CreateApprovalToolResponse {
  data: ApprovalToolOutput;
}

interface RunAgentResponse {
  data: {
    finalOutput: unknown | null;
    pendingApprovals: PendingApproval[];
    hasInterruptions: boolean;
    history: unknown[] | null;
    state: unknown;
  };
}

const harness = createHarness(myComponent);

const testConnection = createConnection(openaiApiKey, {
  apiKey: process.env.OPENAI_API_KEY || "test-key",
});

describe("OpenAI Agent Actions", () => {
  describe("Agent Creation and Execution", () => {
    test("Create agent with structured output for message triage", async () => {
      const triageAgent = (await harness.action("createAgent", {
        name: "Message Triage Analyst",
        instructions: `You are an expert in triaging messages.
  When provided a new message from the user, attempt to categorize it.
  Valid categories are "needs reply" and "ignore".

  For any messages that directly request action from the user, categorize it as "needs reply".
  If no action is requested of the user, categorize it as ignore.

  Give your reasoning for the categorization result and your confidence.`,
        modelName: "gpt-4o-mini",
        outputSchema: JSON.stringify({
          type: "object",
          properties: {
            category: { type: "string" },
            reasoning: { type: "string" },
            confidence: { type: "string" },
          },
          required: ["category", "reasoning", "confidence"],
          additionalProperties: false,
        }),
        outputSchemaName: "output",
        outputSchemaStrict: "true",
      })) as CreateAgentResponse;

      expect(triageAgent.data).toBeDefined();
      expect(triageAgent.data).toHaveProperty("agent");
      expect(triageAgent.data.agent).toHaveProperty(
        "name",
        "Message Triage Analyst",
      );

      if (!process.env.OPENAI_API_KEY) {
        console.log("Skipping agent run - no OPENAI_API_KEY provided");
        return;
      }

      const result = (await harness.action("runAgent", {
        openaiConnection: testConnection,
        agentConfig: triageAgent.data,
        userInput:
          "Hi, I'm interested in your enterprise plan. Can you send me pricing information and schedule a demo? We're a team of 50 people. Thanks, Sarah from TechCorp",
      })) as RunAgentResponse;

      expect(result.data).toBeDefined();
      expect(result.data.finalOutput).toBeDefined();
      expect(result.data.finalOutput).toHaveProperty("category");
      expect(result.data.finalOutput).toHaveProperty("reasoning");
      expect(result.data.finalOutput).toHaveProperty("confidence");
    });

    test("Create agent without structured output", async () => {
      const agent = (await harness.action("createAgent", {
        name: "Simple Assistant",
        instructions: "You are a helpful assistant.",
        modelName: "gpt-4o-mini",
      })) as CreateAgentResponse;

      expect(agent.data).toBeDefined();
      expect(agent.data).toHaveProperty("agent");
      expect(agent.data.agent).toHaveProperty("name", "Simple Assistant");
      expect(agent.data.agent).not.toHaveProperty("outputSchema");
    });
  });

  describe("Multi-Agent Handoffs", () => {
    test("Multi-agent workflow with handoffs", async () => {
      const pricingSpecialist = (await harness.action("createAgent", {
        name: "Pricing Specialist",
        instructions: `You are an expert in pricing.
  When asked about pricing information provide a clear response.
  Here is the detailed pricing information you should reference when creating a response:
  - Free Plan: Free for first user forever.
  - Scale Plan: $25/per user per month
  - Enterprise Plan: Custom pricing available upon request. Reach out to finance for more information.`,
        modelName: "gpt-4o-mini",
        handoffDescription: "Answers pricing related questions",
      })) as CreateAgentResponse;

      const schedulerSpecialist = (await harness.action("createAgent", {
        name: "Scheduler Specialist",
        instructions: `You are an expert in scheduling.
  When asked about scheduling information, take the information and let the user know the request has been forwarded to the team and that they should receive a meeting invite shortly.`,
        modelName: "gpt-4o-mini",
        handoffDescription: "Handles scheduling demos and meetings",
      })) as CreateAgentResponse;

      const salesAssistant = (await harness.action("createAgent", {
        name: "Sales Assistant",
        instructions: `You are a sales helpful assistant.
  Analyze incoming messages, identify customer needs, and draft appropriate responses.
  For pricing inquiries, delegate to the Pricing Specialist.
  For demo requests, delegate to the Demo Schedule Specialist.`,
        modelName: "gpt-4o-mini",
      })) as CreateAgentResponse;

      expect(pricingSpecialist.data).toBeDefined();
      expect(schedulerSpecialist.data).toBeDefined();
      expect(salesAssistant.data).toBeDefined();

      if (!process.env.OPENAI_API_KEY) {
        console.log("Skipping agent run - no OPENAI_API_KEY provided");
        return;
      }

      const result = (await harness.action("runAgent", {
        openaiConnection: testConnection,
        agentConfig: salesAssistant.data,
        handoffs: [pricingSpecialist.data, schedulerSpecialist.data],
        userInput:
          "Hey I have a question about your free plan. How many users does it support before we have to start paying?",
      })) as RunAgentResponse;

      expect(result.data).toBeDefined();
      expect(result.data.finalOutput).toBeDefined();

      expect(typeof result.data.finalOutput).toBe("string");
    });
  });

  describe("Multi-Turn Conversations", () => {
    test("Multi-turn conversation using history", async () => {
      const assistant = (await harness.action("createAgent", {
        name: "Assistant",
        instructions: "You are a helpful assistant.",
        modelName: "gpt-4o-mini",
      })) as CreateAgentResponse;

      expect(assistant.data).toBeDefined();

      if (!process.env.OPENAI_API_KEY) {
        console.log("Skipping agent run - no OPENAI_API_KEY provided");
        return;
      }

      const firstMessage = (await harness.action("runAgent", {
        openaiConnection: testConnection,
        agentConfig: assistant.data,
        userInput:
          "Hey my name is Bob. Can you try to remember that during our conversation?",
      })) as RunAgentResponse;

      expect(firstMessage.data).toBeDefined();
      expect(firstMessage.data.history).toBeDefined();
      expect(Array.isArray(firstMessage.data.history)).toBe(true);

      const followUp = (await harness.action("runAgent", {
        openaiConnection: testConnection,
        agentConfig: assistant.data,
        history: firstMessage.data.history,
        userInput: "Do you remember my name?",
      })) as RunAgentResponse;

      expect(followUp.data).toBeDefined();
      expect(followUp.data.finalOutput).toBeDefined();

      expect(followUp.data.finalOutput).toMatch(/Bob/i);
    });
  });

  describe("Human Approval Flow", () => {
    test("Human approval tool with interrupt and resume", async () => {
      const approvalTool = (await harness.action("createHumanApprovalTool", {
        name: "Human Approval",
        description:
          "Request human approval before proceeding with this action",
      })) as CreateApprovalToolResponse;

      expect(approvalTool.data).toBeDefined();
      expect(approvalTool.data).toHaveProperty("tool");
      expect(approvalTool.data).toHaveProperty("toolName", "Human Approval");

      const assistant = (await harness.action("createAgent", {
        name: "Assistant",
        instructions: `You are a helpful assistant. When you are asked a question, first check with the human using the human approval tool before generating an answer.
  Never answer without first checking with the human.`,
        modelName: "gpt-4o-mini",
        tools: [approvalTool.data],
      })) as CreateAgentResponse;

      expect(assistant.data).toBeDefined();

      if (!process.env.OPENAI_API_KEY) {
        console.log("Skipping agent run - no OPENAI_API_KEY provided");
        return;
      }

      const initialRun = (await harness.action("runAgent", {
        openaiConnection: testConnection,
        agentConfig: assistant.data,
        userInput: "What's the capital of France?",
      })) as RunAgentResponse;

      expect(initialRun.data).toBeDefined();
      expect(initialRun.data.hasInterruptions).toBe(true);
      expect(initialRun.data.pendingApprovals).toBeDefined();
      expect(Array.isArray(initialRun.data.pendingApprovals)).toBe(true);
      expect(initialRun.data.pendingApprovals.length).toBeGreaterThan(0);
      expect(initialRun.data.state).toBeDefined();

      const approvalResponses = initialRun.data.pendingApprovals.map(
        (approval: PendingApproval) => ({
          ...approval.approvalRequest,
          approved: true,
        }),
      );

      const resumedRun = (await harness.action("resumeRun", {
        openaiConnection: testConnection,
        agentConfig: assistant.data,
        state: initialRun.data.state,
        approvalResponses: approvalResponses,
      })) as RunAgentResponse;

      expect(resumedRun.data).toBeDefined();
      expect(resumedRun.data.hasInterruptions).toBe(false);
      expect(resumedRun.data.finalOutput).toBeDefined();

      expect(resumedRun.data.finalOutput).toMatch(/Paris/i);
    });
  });

  describe(
    "File Operations",
    () => {
      test("Upload PDF file", async () => {
        const fs = require("node:fs");

        const pdfContent = fs.readFileSync("./Receipt.pdf");

        if (!process.env.OPENAI_API_KEY) {
          console.log("Skipping file upload - no OPENAI_API_KEY provided");
          return;
        }

        const result = (await harness.action("uploadFile", {
          connection: testConnection,
          file: pdfContent,
          filename: "Receipt.pdf",
          purpose: "assistants",
        })) as UploadFileResponse;

        if (!result) {
          throw Error("Failed to upload file");
        }
        console.log("File upload result:", result);

        expect(result.data).toBeDefined();
        expect(result.data).toHaveProperty("id");
        expect(result.data.id).toMatch(/^file-/);
        expect(result.data).toHaveProperty("object", "file");
        expect(result.data).toHaveProperty("filename", "Receipt.pdf");
        expect(result.data).toHaveProperty("purpose", "assistants");
        expect(result.data).toHaveProperty("bytes");
        expect(result.data.bytes).toBeGreaterThan(0);
        expect(result.data).toHaveProperty("created_at");
        expect(result.data).toHaveProperty("status");

        console.log("File uploaded successfully:", result.data.id);
      });

      test("Upload file and analyze with agent", async () => {
        if (!process.env.OPENAI_API_KEY) {
          console.log(
            "Skipping file analysis test - no OPENAI_API_KEY provided",
          );
          return;
        }

        const fs = require("node:fs");
        const pdfContent = fs.readFileSync("./Receipt.pdf");

        const uploadResult = (await harness.action("uploadFile", {
          connection: testConnection,
          file: pdfContent,
          filename: "Receipt.pdf",
          purpose: "assistants",
        })) as UploadFileResponse;

        if (!uploadResult || !uploadResult.data) {
          throw Error("Failed to upload file");
        }

        const fileId = uploadResult.data.id;
        console.log("File uploaded with ID:", fileId);

        const agent = (await harness.action("createAgent", {
          name: "Document Analyzer",
          instructions:
            "Determine if the pdf is a receipt. Always use your code tool to analyze it.",
          modelName: "gpt-5",
          outputSchemaStrict: true,
          outputSchema: JSON.stringify({
            type: "object",
            properties: {
              vendor: {
                type: "string",
                description: "Name of the company/vendor",
              },
              date: {
                type: "string",
                description: "Transaction date",
              },
              total: {
                type: "number",
                description: "Total amount paid",
              },
              receiptNumber: {
                type: "string",
                description: "Receipt or invoice number",
              },
              items: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      description: "Item name",
                    },
                    price: {
                      type: "number",
                      description: "Item price",
                    },
                  },
                  required: ["name", "price"],
                  additionalProperties: false,
                },
                description: "List of items purchased",
              },
            },
            required: ["vendor", "date", "total", "receiptNumber", "items"],
            additionalProperties: false,
          }),
        })) as CreateAgentResponse;

        expect(agent.data).toBeDefined();
        expect(agent.data).toHaveProperty("agent");

        const analysisResult = (await harness.action("runAgent", {
          openaiConnection: testConnection,
          agentConfig: agent.data,
          userInput: "Analyze the provided file",
          fileIds: [fileId],
        })) as RunAgentResponse;

        expect(analysisResult).toBeDefined();
        expect(analysisResult.data).toBeDefined();
        expect(analysisResult.data.finalOutput).toBeDefined();

        console.log("Agent analysis result:", analysisResult.data.finalOutput);

        const output = String(analysisResult.data.finalOutput);
        expect(output.toLowerCase()).toMatch(
          /anthropic|receipt|invoice|august|25\.00|\$25/i,
        );
      });

      test("List uploaded files", async () => {
        if (!process.env.OPENAI_API_KEY) {
          console.log("Skipping list files test - no OPENAI_API_KEY provided");
          return;
        }

        const result = (await harness.action("listFiles", {
          connection: testConnection,
        })) as ListFilesResponse;

        expect(result).toBeDefined();
        expect(result.data).toBeDefined();
        expect(result.data).toHaveProperty("object", "list");
        expect(result.data).toHaveProperty("data");
        expect(Array.isArray(result.data.data)).toBe(true);

        console.log(`Found ${result.data.data.length} files in the account`);

        const assistantFiles = (await harness.action("listFiles", {
          connection: testConnection,
          purpose: "assistants",
        })) as ListFilesResponse;

        expect(assistantFiles).toBeDefined();
        expect(assistantFiles.data).toBeDefined();
        expect(Array.isArray(assistantFiles.data.data)).toBe(true);

        if (assistantFiles.data.data.length > 0) {
          for (const file of assistantFiles.data.data) {
            expect(file.purpose).toBe("assistants");
          }
        }
      });

      test("Retrieve file metadata", async () => {
        if (!process.env.OPENAI_API_KEY) {
          console.log(
            "Skipping retrieve file test - no OPENAI_API_KEY provided",
          );
          return;
        }

        const fs = require("node:fs");
        const pdfContent = fs.readFileSync("./Receipt.pdf");

        const uploadResult = (await harness.action("uploadFile", {
          connection: testConnection,
          file: pdfContent,
          filename: "test-retrieve.pdf",
          purpose: "assistants",
        })) as UploadFileResponse;

        expect(uploadResult).toBeDefined();
        expect(uploadResult.data).toBeDefined();
        expect(uploadResult.data).toHaveProperty("id");

        const fileId = uploadResult.data.id;

        const retrieveResult = (await harness.action("retrieveFile", {
          connection: testConnection,
          fileId: fileId,
        })) as RetrieveFileResponse;

        expect(retrieveResult).toBeDefined();
        expect(retrieveResult.data).toBeDefined();
        expect(retrieveResult.data).toHaveProperty("id", fileId);
        expect(retrieveResult.data).toHaveProperty("object", "file");
        expect(retrieveResult.data).toHaveProperty(
          "filename",
          "test-retrieve.pdf",
        );
        expect(retrieveResult.data).toHaveProperty("purpose", "assistants");
        expect(retrieveResult.data).toHaveProperty("bytes");
        expect(retrieveResult.data.bytes).toBeGreaterThan(0);

        console.log("File metadata retrieved successfully:", fileId);
      });

      test("Delete file", async () => {
        if (!process.env.OPENAI_API_KEY) {
          console.log("Skipping delete file test - no OPENAI_API_KEY provided");
          return;
        }

        const testBuffer = Buffer.from("File to be deleted", "utf-8");

        const uploadResult = (await harness.action("uploadFile", {
          connection: testConnection,
          file: testBuffer,
          filename: "test-delete.txt",
          purpose: "assistants",
        })) as UploadFileResponse;

        expect(uploadResult).toBeDefined();
        expect(uploadResult.data).toBeDefined();
        expect(uploadResult.data).toHaveProperty("id");

        const fileId = uploadResult.data.id;
        console.log("Uploaded file for deletion:", fileId);

        const deleteResult = (await harness.action("deleteFile", {
          connection: testConnection,
          fileId: fileId,
        })) as DeleteFileResponse;

        expect(deleteResult).toBeDefined();
        expect(deleteResult.data).toBeDefined();
        expect(deleteResult.data).toHaveProperty("id", fileId);
        expect(deleteResult.data).toHaveProperty("object", "file");
        expect(deleteResult.data).toHaveProperty("deleted", true);

        console.log("File deleted successfully:", fileId);

        try {
          await harness.action("retrieveFile", {
            connection: testConnection,
            fileId: fileId,
          });

          throw new Error("File should have been deleted");
        } catch (e) {
          const error = e as Error;

          expect(error.message).toMatch(/not found|404|deleted/i);
          console.log(
            "Confirmed file is deleted - retrieve failed as expected",
          );
        }
      });
    },
    { timeout: 300000 },
  );
});
