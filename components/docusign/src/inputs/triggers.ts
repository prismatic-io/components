import { connection } from "./common";
import { connectKey, webhookEvents } from "./webhooks";

export const accountTriggerInputs = { connectKey, connection, webhookEvents };
