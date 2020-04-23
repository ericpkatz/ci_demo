const app = require('./app');
const { conn, User } = require('./db');

const port = process.env.PORT || 3000;


conn.sync({ force: true })
  .then(()=> Promise.all([
      User.create({ name: 'Lucy' }),
      User.create({ name: 'Moe' }),
      User.create({ name: 'Curly' }),
    ])
  );
app.listen(port, ()=> console.log(`listening on port ${port}`));
