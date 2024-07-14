import { Router } from "express";
import {
  createLeague,
  getLeagueById,
  getLeagueByName,
  joinLeague,
  finalizeResults,
} from "../controllers/leagueController";

const router = Router();

router.post("/create", createLeague);
router.get("/id/:id", getLeagueById);
router.get("/name/:name", getLeagueByName);
router.post("/join", joinLeague);
router.post("/finalize", finalizeResults);

export default router;
