import { Router } from 'express';
import { createInteraction, getAllInteractions, getCustomerInteractions, updateInteractionStatus, deleteInteractionById,rescheduleInteraction } from '../controllers/interaction.controller.js';

const router = Router();

router.post('/', createInteraction);
router.get('/', getAllInteractions);
router.get('/customer/:customerId', getCustomerInteractions);
router.put('/:id/status', updateInteractionStatus);
router.delete('/:id', deleteInteractionById);
router.put('/:id/reschedule', rescheduleInteraction);

export default router;