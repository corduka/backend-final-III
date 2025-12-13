
import { Router } from 'express';

const router = Router();

router.get('/mock/adoptions', (req, res) => {
    res.json([
        {
            _id: 'mock1',
            petId: 'petMock',
            userId: 'userMock',
            status: 'pending'
        }
    ]);
});

export default router;