import Interaction from "../models/interaction.model.js";
import Customer from "../models/customer.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * CREATE INTERACTION
 */
export const createInteraction = asynchandler(async (req, res) => {
  const { customerId, type, content, scheduledAt } = req.body;

  if (!customerId || !type || !content) {
    throw new ApiError(400, "Customer, type and content are required");
  }

  // Ensure customer belongs to user
  const customer = await Customer.findOne({
    _id: customerId,
    user: req.user.id,
  });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  // Meeting rules
  if (type === "meeting" && !scheduledAt) {
    throw new ApiError(400, "scheduledAt is required for meetings");
  }

  // Conflict check only for meetings
  if (type === "meeting") {
    const start = new Date(scheduledAt);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const conflict = await Interaction.findOne({
      customer: customerId,
      user: req.user.id,
      type: "meeting",
      status: "scheduled",
      scheduledAt: { $lt: end, $gte: start },
    });

    if (conflict) {
      throw new ApiError(
        409,
        "Another meeting is already scheduled at this time"
      );
    }
  }

  const interaction = await Interaction.create({
    user: req.user.id,
    customer: customerId,
    type,
    content,
    status: type === "meeting" ? "pending" : "completed",
    scheduledAt: type === "meeting" ? scheduledAt : undefined,
  });

  res
    .status(201)
    .json(new ApiResponse(201, interaction, "Interaction created"));
});

/**
 * GET INTERACTIONS FOR A CUSTOMER
 */
export const getCustomerInteractions = asynchandler(async (req, res) => {
  const { customerId } = req.params;

  const interactions = await Interaction.find({
    customer: customerId,
    user: req.user.id,
  })
    .sort({ createdAt: -1 })
    .populate("customer", "name email")
    .lean();

  res.json(
    new ApiResponse(200, interactions, "Customer interactions fetched")
  );
});

/**
 * MARK INTERACTION COMPLETED
 */
export const updateInteractionStatus = asynchandler(async (req, res) => {
  const { id } = req.params;

  const interaction = await Interaction.findOneAndUpdate(
    { _id: id, user: req.user.id },
    { status: "completed" },
    { new: true }
  );

  if (!interaction) {
    throw new ApiError(404, "Interaction not found");
  }

  res.json(
    new ApiResponse(200, interaction, "Interaction marked completed")
  );
});

/**
 * DELETE INTERACTION (PERMANENT)
 */
export const deleteInteractionById = asynchandler(async (req, res) => {
  const interaction = await Interaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!interaction) {
    throw new ApiError(404, "Interaction not found");
  }

  res.json(new ApiResponse(200, null, "Interaction deleted"));
});
