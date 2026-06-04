export const EXAMPLES = {
  agentName: "Sales Email Assistant",

  agentInstructions:
    "You are a sales email assistant. Analyze incoming emails, identify customer needs, and draft appropriate responses. " +
    "For pricing inquiries, delegate to the Pricing Specialist. For demo requests, delegate to the Demo Scheduler.",

  emailSchema: {
    type: "object",
    properties: {
      emailType: {
        type: "string",
        enum: ["inquiry", "demo_request", "pricing", "support", "other"],
      },
      priority: {
        type: "string",
        enum: ["high", "medium", "low"],
      },
      suggestedResponse: { type: "string" },
      nextSteps: {
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["emailType", "priority", "suggestedResponse"],
  },

  agentConfig: {
    agent: {
      name: "Sales Email Assistant",
      instructions:
        "You are a sales email assistant. Analyze incoming emails and draft appropriate responses.",
      model: "gpt-5-mini-2025-08-07",
    },
  },

  userInput:
    "Hi, I'm interested in your enterprise plan. Can you send me pricing information and schedule a demo? " +
    "We're a team of 50 people. Thanks, Sarah from TechCorp",

  handoffAgents: [
    {
      agent: {
        name: "Pricing Specialist",
        instructions:
          "Provide detailed pricing information, discounts, and create custom quotes.",
        model: "gpt-5-mini-2025-08-07",
        handoffDescription: "Handles pricing and quotes",
      },
    },
    {
      agent: {
        name: "Demo Scheduler",
        instructions:
          "Schedule product demos and coordinate with the sales team calendar.",
        model: "gpt-5-mini-2025-08-07",
        handoffDescription: "Schedules product demos",
      },
    },
  ],

  branchDefinitions:
    "needs_reply -> Email requires a response or action\n" +
    "informational -> FYI only, no action needed\n" +
    "spam -> Unsolicited commercial email\n" +
    "urgent -> Time-sensitive, requires immediate attention",

  classificationInstructions:
    "Consider the sender, subject urgency, and whether a response is explicitly requested. " +
    "Prioritize 'urgent' for anything mentioning deadlines today or tomorrow.",
};
