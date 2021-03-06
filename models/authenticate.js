const pg_conn = require('./database');

async function authentication (user, pass){
    var authenticated = false;
    const acc_query = 
    {
        text: 'select * from users where username = $1 and password = $2',
        values: [user, pass]
    };
    var query_data = await pg_conn.query(acc_query);
    if(query_data.rows.length == 1)
    {
        authenticated = true
    }
    console.log(authenticated)
    return authenticated;
}

module.exports = authentication