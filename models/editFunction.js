const pg_conn = require('./database');

async function editAction(id, body)
{
    var get_query = 'select * from product'
    var get_query_data = await pg_conn.query(get_query);
    var headerData = Object.keys(get_query_data.rows[0])
    var edit_query = 'update product set '
    for(let headerIndex in headerData)
    {
        var nameOfValue = headerData[headerIndex] // name of header
        // body[nameOfValue] is data entered
        if(isNaN(body[nameOfValue])){
            var fieldName = nameOfValue + "='" + body[nameOfValue] + "'"
        }else{
            fieldName = nameOfValue + "=" +body[nameOfValue]
        }
        edit_query += `${fieldName},`
    }
    edit_query = edit_query.slice(0,-1) + ` WHERE product_id = ${id}`
    console.log(edit_query)
    var query_data = await pg_conn.query(edit_query);
}

module.exports = editAction