import { Agent, tool } from "@openai/agents";
import { z } from "zod";
import { prisma } from '../infra/db/prisma'

const getUserByEmailTool = tool({
  name: "get_users",
  description: "Search all users from database with the specified email.",
  parameters: z.object({ email: z.string() }),
  async execute({ email }) {
    return getUsersByEmail(email)
  }
});

const getUsersByEmail = (email: string) => {
  return prisma.user.findMany({
    where: {
      email
    }
  });
}

const getAllUsersTool = tool({
  name: "get_all_users",
  description: "Get all users from database.",
  parameters: z.object({}),
  async execute() {
    return getAllUsers()
  }
});

const getAllUsers = () => {
  return prisma.user.findMany();
}

export const readOnlyAgent = new Agent({
  name: 'Read-Only Agent',
  model: 'gpt-5.5',
  instructions:
    `You are a read-only data assistant.
    Only answer questions using available read tools.
    Never create, update, or delete data.
    If a required parameter is missing (e.g., email), ask a concise follow-up question.
    If no records are found, state that clearly and suggest the next query.`,
  tools: [getUserByEmailTool, getAllUsersTool]
})
