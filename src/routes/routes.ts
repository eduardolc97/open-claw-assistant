import { Router } from "express";
import { getUsersHandler } from "@src/modules/users/users.handlers";

const router = Router();

router.get('/users/:email', getUsersHandler);

export default router;