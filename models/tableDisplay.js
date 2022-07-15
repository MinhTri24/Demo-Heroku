const pg_conn = require('./database');

async function displayTable (user)
{
    const acc_query = 
    {
        text: 'select role from users where username = $1',
        values: [user]
    };
    console.log(user);
    var query_data = await pg_conn.query(acc_query)
    var role = query_data.rows[0].role;
    let table_query = {}
    if(role == 'boss')
    {
        table_query=
        {
            text: 'SELECT * FROM product'
        };
        query_data = await pg_conn.query(table_query);
        var dataTable = query_data.rows
        var stringTable = "<table class= 'table'><thead class= 'thead-dark'><tr>"
        var headerData = Object.keys(dataTable[0])
        for (let headerIndex in headerData) 
        {
            var header = "<th scope ='col'>" + headerData[headerIndex] + "</th>"
            stringTable += header
        }

        stringTable += "<th scope = 'col'> CRUD </th></tr></thead><tbody>";
        for(let rowIndex in dataTable)
        {
            var bodyTable = "<tr>"
            rowData = dataTable[rowIndex]
            id_product = rowData[Object.keys(rowData)[0]]
            for(let fieldIndex in rowData)
            {
                var cell = "<td scope='row'>" + rowData[fieldIndex] + "</td>"
                bodyTable += cell
            }
            var get_query = "?id=" + id_product + "&user=" + user
            bodyTable += `<td><a href='/users/delete${get_query}'> Delete </a></td>`
            bodyTable += "</tr>"
            stringTable += bodyTable
        }
        stringTable += `<tr> <form action='/users/add${get_query}' method='POST'>`
        for(let headerIndex in headerData){
            stringTable += `<td scope='row'><input type='text' name='${headerData[headerIndex]}'></td>`
        }
        stringTable += "<td scope='row'> <button type='submit' class='btn btn-success'>Add</button> </td>"
        stringTable += "</form></tr>"
        stringTable += `<tr> <form action='/users/edit?user=${user}' method='POST'>`
        for(let headerIndex in headerData){
            stringTable += `<td scope='row'><input type='text' name='${headerData[headerIndex]}'></td>`
        }
        stringTable += "<td scope='row'> <button type='submit' class='btn btn-danger'>Edit</button> </td>"
        stringTable += "</form></tr>"
        stringTable += "</tbody></table>"
    }
    else{   
        table_query = 
        {
            text: 'SELECT * FROM product WHERE role = $1',
            values: [role]
        };
        query_data = await pg_conn.query(table_query);
        var dataTable = query_data.rows
        var stringTable = "<table class= 'table'><thead class= 'thead-dark'><tr>"
        var headerData = Object.keys(dataTable[0])
        for (let headerIndex in headerData) 
        {
            var header = "<th scope ='col'>" + headerData[headerIndex] + "</th>"
            stringTable += header
        }

        stringTable += "<th scope = 'col'> CRUD </th></tr></thead><tbody>";
        for(let rowIndex in dataTable)
        {
            var bodyTable = "<tr>"
            rowData = dataTable[rowIndex]
            id_product = rowData[Object.keys(rowData)[0]]
            for(let fieldIndex in rowData)
            {
                var cell = "<td scope='row'>" + rowData[fieldIndex] + "</td>"
                bodyTable += cell
            }
            var get_query = "?id=" + id_product + "&user=" + user
            bodyTable += `<td><a href='/users/delete${get_query}'> Delete </a></td>`
            bodyTable += "</tr>"
            stringTable += bodyTable
        }
        stringTable += `<tr> <form action='/users/add${get_query}' method='POST'>`
        for(let headerIndex in headerData){
            stringTable += `<td scope='row'><input type='text' name='${headerData[headerIndex]}'></td>`
        }
        stringTable += "<td scope='row'> <button type='submit' class='btn btn-success'>Add</button> </td>"
        stringTable += "</form></tr>"
        stringTable += `<tr> <form action='/users/edit?user=${user}' method='POST'>`
        for(let headerIndex in headerData){
            stringTable += `<td scope='row'><input type='text' name='${headerData[headerIndex]}'></td>`
        }
        stringTable += "<td scope='row'> <button type='submit' class='btn btn-danger'>Edit</button> </td>"
        stringTable += "</form></tr>"
        stringTable += "</tbody></table>"
    }
    console.log(stringTable)
    return stringTable
}

module.exports = displayTable