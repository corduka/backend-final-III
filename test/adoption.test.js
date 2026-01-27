import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const requester = supertest(app);

describe('Adoption Router Functional Tests', () => {

  it('GET /api/adoptions should return all adoption requests', async () => {
    const res = await requester.get('/api/adoptions');
    expect(res.status).to.equal(200);
  });

  it('POST /api/adoptions should create adoption', async () => {
    const res = await requester.post('/api/adoptions').send({
      petId: 'pet123',
      userId: 'user123',
      status: 'pending'
    });

    expect(res.status).to.equal(201);
  });

});