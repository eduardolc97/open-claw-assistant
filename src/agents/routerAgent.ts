import { Agent, run } from "@openai/agents";
import { readOnlyAgent } from "./readOnlyAgent";
import { userManagementAgent } from "./userManagementAgent";
import pino from "pino";

const logger = pino();

const routerAgent = new Agent({
  name: 'Agent Router',
  model: 'gpt-5.5',
  instructions:
    `You are an agent router.
    Route read/query requests (search/list/get) to Read-Only Agent.
    Route mutation requests (create/update/delete) to User Management Agent.
    If user intent is ambiguous, ask one short clarification question before routing.
    You are talking to analytics professionals, so your answers must have good data insights.`,
  handoffs: [readOnlyAgent, userManagementAgent]
})

export const askRouterAgent = async (input: string) => {
  const response = await run(routerAgent, input);
  logger.info(response);
  return response.finalOutput;
}