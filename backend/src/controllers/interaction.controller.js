import Interaction from '../models/interaction.model.js';
import { asynchandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


export const createInteraction = asynchandler(async (req, res) => {
    const { customer, type, content ,scheduledAt} = req.body;

    if (!customer || !type || !content || !scheduledAt) {
        throw new ApiError(400, "Customer, type ,content and scheduledAt are required");
    }

    if (type === "note") {
        const interaction = await Interaction.create(req.body);
        return res.status(201).json(interaction);
    }

    if (type === "call" || type === "meeting") {
        if (!scheduledAt) {
            throw new ApiError(400, "scheduledAt is required");
        }

        const start = new Date(scheduledAt);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // assume 1 hour

        const conflict = await Interaction.findOne({
            customer,
            type,
            status: "pending",
            scheduledAt: { $lt: end, $gte: start },
        });

        if (conflict) {
            throw new ApiError(
            409,
            "Another interaction is already scheduled at this time"
            );
        }
    }

    const interaction = await Interaction.create({
        customer,
        type,
        content,
        scheduledAt
    });

    res.status(201).json(new ApiResponse(201, interaction, "Interaction created successfully"));
});

export const getAllInteractions = asynchandler(async (req, res) => {
    const interactions = await Interaction.find()
  .populate("customer", "name email");

    res.status(200).json(new ApiResponse(200, interactions, "Interactions retrieved successfully"));

});

export const getCustomerInteractions = asynchandler(async (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    throw new ApiError(400, "Customer ID is required");
  }

  const interactions = await Interaction.find({ customer: customerId })
    .sort({ scheduledAt: -1, createdAt: -1 })
    .populate("customer", "name email");

  return res.status(200).json(
    new ApiResponse(
      200,
      interactions,
      "Customer interactions fetched successfully"
    )
  );
});

export const updateInteractionStatus = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
        throw new ApiError(400, "Status is required");
    }   
    const interaction = await Interaction.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!interaction) {
        throw new ApiError(404, "Interaction not found");
    }   
    res.status(200).json(new ApiResponse(200, interaction, "Interaction status updated successfully"));
});

export const deleteInteractionById = asynchandler(async (req, res) => {
    const { id } = req.params;  
    const interaction = await Interaction.findByIdAndDelete(id);
    if (!interaction) {
        throw new ApiError(404, "Interaction not found");
    }
    res.status(200).json(new ApiResponse(200, interaction, "Interaction deleted successfully"));
});

export const rescheduleInteraction = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { scheduledAt } = req.body;
    
    if (!scheduledAt) {
        throw new ApiError(400, "scheduledAt is required");
    }   

    const interaction = await Interaction.findById(id);

    if (!interaction) {
        throw new ApiError(404, "Interaction not found");
    }   

    const start = new Date(scheduledAt);
    const end = new Date(start.getTime() + 60 * 60 * 1000); // assume 1 hour

    const conflict = await Interaction.findOne({
        customer: interaction.customer,
        type: interaction.type, 
        status: "pending",
        scheduledAt: { $lt: end, $gte: start },
        _id: { $ne: id }, // exclude current interaction
    });

    if (conflict) {
        throw new ApiError(409, "Another interaction is already scheduled at this time");
    }

    interaction.scheduledAt = scheduledAt;
    await interaction.save();   
    res.status(200).json(new ApiResponse(200, interaction, "Interaction rescheduled successfully"));
});