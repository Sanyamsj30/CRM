import Customer from '../models/customer.model.js';
import { asynchandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create a new customer
export const createCustomer = asynchandler(async (req, res) => {
  const { name, email, phone, relationship, status } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }

  // optional but recommended
  if (!phone && !email) {
    throw new ApiError(400, "At least phone or email is required");
  }

  if (!req.user || !req.user.id) {
  throw new ApiError(401, "Unauthorized");
}


  // prevent duplicate per user
  if (phone) {
    const existing = await Customer.findOne({
      phone,
      user: req.user.id,
    });

    if (existing) {
      throw new ApiError(409, "Customer already exists with this phone");
    }
  }

  const customer = await Customer.create({
    name,
    email,
    phone,
    relationship,
    status,
    user: req.user.id,
  });

  res
    .status(201)
    .json(new ApiResponse(201, customer, "Customer created successfully"));
});


// Get all customers

export const getAllCustomers = asynchandler(async (req, res) => {
  const { search, status, relationship } = req.query;

  const query = { user: req.user.id };

  // Search by name, email, phone
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by status
  if (status && status !== "All Status") {
    query.status = status;
  }

  // Filter by relationship/type
  if (relationship && relationship !== "All Types") {
    query.relationship = relationship;
  }

  const customers = await Customer.find(query).sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, customers, "Customers fetched successfully"));
});


// Get a single customer by ID

export const getCustomerbyId = asynchandler(async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findOne({
    _id: id,
    user: req.user.id,
  });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer retrieved successfully"));
});

// Update a customer by ID
export const updateCustomerbyId = asynchandler(async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findOneAndUpdate(
    { _id: id, user: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer updated successfully"));
});


// Delete a customer by ID

export const deleteCustomerbyId = asynchandler(async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findOneAndDelete({
    _id: id,
    user: req.user.id,
  });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, customer, "Customer deleted successfully"));
});

