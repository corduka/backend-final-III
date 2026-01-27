import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json([
        {
            _id: 'mock123',
            petId: 'petMock',
            userId: 'userMock',
            status: 'pending'
        }
    ]);
});

export default router;

