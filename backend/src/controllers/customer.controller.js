import Customer from '../models/customer.model.js';
import { asynchandler } from '../utils/asynchandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Create a new customer

export const createCustomer = asynchandler(async(req,res)=>{
    const { phone } = req.body;

    if (!phone) {
        throw new ApiError(400, "Phone is required");
    }

    const existingCustomer = await Customer.findOne({ phone });

    if (existingCustomer) {
        throw new ApiError(409, "Customer already exists with this phone");
    }
    const customer = Customer.create(req.body);

    res.status(201).json(new ApiResponse(201,customer,"Customer created successfully"));
})

// Get all customers

export const getAllCustomers = asynchandler(async(req,res)=>{
    const customers = await Customer.find();

    res.status(200).json(new ApiResponse(200,customers,"Customers retrieved successfully"));
})

// Get a single customer by ID

export const getCustomerbyId = asynchandler(async(req,res)=>{
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if(!customer){
        throw new ApiError(404,"Customer not found");
    }

    res.status(200).json(new ApiResponse(200,customer,"Customer retrieved successfully"));
}
)

// Update a customer by ID
export const updateCustomerbyId = asynchandler(async(req,res)=>{
    const { id } = req.params;

    const customer  = await Customer.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});

    if(!customer){
        throw new ApiError(404,"Customer not found");
    }   
    res.status(200).json(new ApiResponse(200,customer,"Customer updated successfully"));
}
)

// Delete a customer by ID

export const deleteCustomerbyId = asynchandler(async(req,res)=>{
    const { id } = req.params;

    const customer = await Customer.findByIdAndDelete(id);

    if(!customer){
        throw new ApiError(404,"Customer not found");
    }

    res.status(200).json(new ApiResponse(200,customer,"Customer deleted successfully"));
}
)
