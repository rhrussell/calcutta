import { Router } from "express";
import {
  createLeague,
  getLeagueById,
  finalizeResults,
} from "../controllers/leagueController";

const router = Router();

router.post("/create", createLeague);
router.get("/:id", getLeagueById);
router.post("/finalize", finalizeResults);

export default router;
