const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db_test');

const User = conn.define('user', {
  name: STRING 
});

const _app = require('supertest')(app);

app.get('/api/users', async(req, res, next)=> res.send(await User.findAll()));

const { expect } = require('chai');

describe('the truth', ()=> {
  it('true to equal true', ()=> {
    expect(true).to.equal(true);
  });
});

describe('GET /api/users', ()=> {
  beforeEach(async()=> {
    await conn.sync({ force: true });
    await Promise.all([
      User.create({ name: 'Lucy' }),
      User.create({ name: 'Moe' }),
    ]);
  });
  it('returns the users', async()=> {

    const response = await _app.get('/api/users');
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(2);
  });
});
