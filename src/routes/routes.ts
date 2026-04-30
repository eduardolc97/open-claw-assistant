import { Router } from "express";
import { getUsersHandler } from "@src/modules/users/users.handlers";
import { agentHandler } from "@src/modules/agent/agent.handler";

const router = Router();

router.get('/users/:email', getUsersHandler);
router.post('/ask/', agentHandler);

export default router;