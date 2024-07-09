import { Router } from "express";
import {
  createLeague,
  getLeagueById,
  finalizeAuction,
} from "../controllers/leagueController";

const router = Router();

router.post("/create", createLeague);
router.get("/:id", getLeagueById);
router.put("/finalize", finalizeAuction);

export default router;
