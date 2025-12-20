import { createCustomer,getAllCustomers,getCustomerbyId,updateCustomerbyId,deleteCustomerbyId } from "../controllers/customer.controller.js";
import { Router } from "express";

const router = Router();

router.post("/",createCustomer);
router.get("/",getAllCustomers);
router.get("/:id",getCustomerbyId);
router.put("/:id",updateCustomerbyId);
router.delete("/:id",deleteCustomerbyId);

export default router;