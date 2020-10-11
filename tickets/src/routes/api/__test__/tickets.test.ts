import request from 'supertest';
import app from '../../../app';

describe('/api/tickets', () => {
  describe('GET', () => {});
  describe('POST', () => {
    it('listens for a post request', async () => {});
    it('is only accessed by authenticated users', async () => {});
    it('returns an error if invalid title', async () => {});
    it('returns an error if invalid price', async () => {});
    it('created a ticket with valid inputs', async () => {});
  });
  describe('PUT', () => {});
});

describe('/api/tickets/:id', () => {
  describe('GET', () => {});
});
