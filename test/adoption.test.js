
import chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app); 


describe('Adoption Router Functional Tests', () => {
    

    it('GET /api/adoptions should return all adoption requests with status 200', async () => {
        const response = await requester.get('/api/adoptions'); 

        expect(response.status).to.equal(200); 
        expect(response.body).to.be.an('array');
    });

    
    it('POST /api/adoptions should create a new request and return status 201', async () => {
        const adoptionRequestPayload = {
    
            petId: 'validPetId123', 
            userId: 'validUserId456',
            status: 'pending'
        };

        const response = await requester.post('/api/adoptions').send(adoptionRequestPayload);

        expect(response.status).to.equal(201); 
        expect(response.body).to.have.property('_id'); 
        expect(response.body.status).to.equal('pending');
    });

    it('POST /api/adoptions should return 400 for invalid payload', async () => {
        const invalidPayload = {
            petId: '', 
            userId: 'validUserId456',
        };

        const response = await requester.post('/api/adoptions').send(invalidPayload);

        expect(response.status).to.equal(400); 
        expect(response.body).to.have.property('error');
    });
});