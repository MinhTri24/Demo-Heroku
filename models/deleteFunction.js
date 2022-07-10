const pg_conn = require('./database');

async function deleteAction(id)
{
    const id_query = 
    {
        text: 'delete from product where product_id = $1',
        values: [id]
    }
    console.log(id_query)
    var query_data = await pg_conn.query(id_query)
}

module.exports = deleteAction;