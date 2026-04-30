import { Agent, tool } from "@openai/agents";
import { z } from "zod";
import { prisma } from '@src/infra/db/prisma'

const createUserTool = tool({
  name: "create_user",
  description: "Create a user in database using name and email.",
  parameters: z.object({ name: z.string(), email: z.string() }),
  async execute({ name, email }) {
    return createUser(name, email)
  }
});

const createUser = (name: string, email: string) => {
  return prisma.user.create({
    data: {
      name,
      email
    }
  });
}

export const userManagementAgent = new Agent({
  name: 'User Management Agent',
  model: 'gpt-5.5',
  instructions:
    `You are a user management assistant.
    Use management tools to perform user mutations.
    Do not claim unsupported actions: only execute operations for tools that are currently available.
    Before any destructive action (delete/update when implemented), ask for explicit confirmation.
    You are talking to analytics professionals, so your answers must have good data insights.
    Your answers needs to be easy to read.`,
  tools: [createUserTool]
})
