import { Router } from 'express';
import { createInteraction, getCustomerInteractions, updateInteractionStatus, deleteInteractionById ,rescheduleInteraction} from '../controllers/interaction.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/',authMiddleware, createInteraction);
// router.get('/', authMiddleware, getAllInteractions);
router.get('/customer/:customerId',authMiddleware, getCustomerInteractions);
router.put('/:id/status',authMiddleware, updateInteractionStatus);
router.delete('/:id', authMiddleware, deleteInteractionById);
router.put('/:id/reschedule', authMiddleware, rescheduleInteraction);



export default router;