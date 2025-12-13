import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Adoption Router - Functional Tests', () => {

    let createdAdoptionId;

    /**
     * GET ALL ADOPTIONS
     */
    it('GET /api/adoptions should return an array of adoptions with status 200', async () => {
        const response = await requester.get('/api/adoptions');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');

        if (response.body.length > 0) {
            expect(response.body[0]).to.have.property('_id');
            expect(response.body[0]).to.have.property('petId');
            expect(response.body[0]).to.have.property('userId');
            expect(response.body[0]).to.have.property('status');
        }
    });

    /**
     * CREATE ADOPTION
     */
    it('POST /api/adoptions should create a new adoption and return status 201', async () => {
        const adoptionPayload = {
            petId: 'pet123',
            userId: 'user123',
            status: 'pending'
        };

        const response = await requester
            .post('/api/adoptions')
            .send(adoptionPayload);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('_id');
        expect(response.body.petId).to.equal('pet123');
        expect(response.body.userId).to.equal('user123');
        expect(response.body.status).to.equal('pending');

        createdAdoptionId = response.body._id;
    });


    it('GET /api/mock/adoptions should return mocked data', async () => {
    const response = await requester.get('/api/mock/adoptions');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0].petId).to.equal('petMock');
});

    /**
     * INVALID CREATE
     */
    it('POST /api/adoptions should return 400 when payload is invalid', async () => {
        const invalidPayload = {
            petId: '',
            userId: 'user123'
        };

        const response = await requester
            .post('/api/adoptions')
            .send(invalidPayload);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error');
    });

    /**
     * GET ADOPTION BY ID
     */
    it('GET /api/adoptions/:id should return a single adoption', async () => {
        const response = await requester.get(`/api/adoptions/${createdAdoptionId}`);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('_id');
        expect(response.body._id).to.equal(createdAdoptionId);
    });

    /**
     * GET ADOPTION BY ID - NOT FOUND
     */
    it('GET /api/adoptions/:id should return 404 if adoption does not exist', async () => {
        const fakeId = '64b000000000000000000000';

        const response = await requester.get(`/api/adoptions/${fakeId}`);

        expect(response.status).to.equal(404);
    });

    /**
     * UPDATE ADOPTION
     */
    it('PUT /api/adoptions/:id should update adoption status', async () => {
        const response = await requester
            .put(`/api/adoptions/${createdAdoptionId}`)
            .send({ status: 'approved' });

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal('approved');
    });

    /**
     * DELETE ADOPTION
     */
    it('DELETE /api/adoptions/:id should delete the adoption', async () => {
        const response = await requester.delete(`/api/adoptions/${createdAdoptionId}`);

        expect(response.status).to.equal(200);
    });

});