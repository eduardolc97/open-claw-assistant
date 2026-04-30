import { Request, Response } from "express";
import { askRouterAgent } from "@src/agents/routerAgent";
import { askAgentInputSchema } from "./agent.schemas";

export const agentHandler = async (req: Request, res: Response) => {
  const agentInput = askAgentInputSchema.safeParse(req.body.input);

  if (agentInput.success) {
    const response = await askRouterAgent(agentInput.data);
    res.send(response);
  } else {
    throw new Error('Missing input');
  }

}