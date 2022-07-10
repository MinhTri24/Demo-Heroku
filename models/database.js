const { Pool } = require('pg');

const pg_connection = new Pool({
    user: 'ftxwpzkmjvrynu',
    host: 'ec2-52-73-184-24.compute-1.amazonaws.com',
    database: 'dbnjvl38g0r1eq',
    password: '7557c4a7728e24434f5ef8f5c10d887dddaa6ace9138aeb2be8e1171a06172ee',
    port: 5432,
    ssl:{
        rejectUnauthorized: false
    }
})

module.exports = pg_connection  