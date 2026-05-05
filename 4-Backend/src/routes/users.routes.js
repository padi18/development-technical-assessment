import { Router } from "express";
import { UserTransactions } from "../controllers/users.controller.js";

const router = Router();

router.get("/transactions", UserTransactions);

export default router;
