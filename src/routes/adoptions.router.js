import { Router } from 'express';

const router = Router();

let adoptions = [];

// GET ALL
router.get('/', (req, res) => {
    res.status(200).json(adoptions);
});

// CREATE
router.post('/', (req, res) => {
    const { petId, userId, status } = req.body;

    if (!petId || !userId) {
        return res.status(400).json({ error: 'Invalid payload' });
    }

    const newAdoption = {
        _id: Date.now().toString(),
        petId,
        userId,
        status: status || 'pending'
    };

    adoptions.push(newAdoption);

    res.status(201).json(newAdoption);
});

// GET BY ID
router.get('/:id', (req, res) => {
    const adoption = adoptions.find(a => a._id === req.params.id);

    if (!adoption) {
        return res.status(404).json({ error: 'Adoption not found' });
    }

    res.json(adoption);
});

// UPDATE
router.put('/:id', (req, res) => {
    const adoption = adoptions.find(a => a._id === req.params.id);

    if (!adoption) {
        return res.status(404).json({ error: 'Adoption not found' });
    }

    adoption.status = req.body.status || adoption.status;
    res.json(adoption);
});

// DELETE
router.delete('/:id', (req, res) => {
    adoptions = adoptions.filter(a => a._id !== req.params.id);
    res.status(200).json({ message: 'Adoption deleted' });
});

export default router;