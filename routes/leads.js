const express = require("express");
const leadRouter = express.Router();
const {
  getAllLeads,
  addNewLead,
  getLeadById,
  updateLead,
} = require("../controllers/lead.controller");
const checkAuthMiddleware = require("../middleware/check-auth");

leadRouter.get("/", checkAuthMiddleware.checkAuth, getAllLeads);
leadRouter.post("/new", checkAuthMiddleware.checkAuth, addNewLead);
leadRouter.get("/:id", checkAuthMiddleware.checkAuth, getLeadById);
leadRouter.post("/updateLead/:id", checkAuthMiddleware.checkAuth, updateLead);

module.exports = leadRouter;
