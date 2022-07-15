var express = require('express');
var router = express.Router();
var authen = require('../models/authenticate');
var displayTable = require('../models/tableDisplay');
const url = require('url')
const deleteAction = require('../models/deleteFunction')
const addFunction = require('../models/addFunction')
const editFunction = require('../models/editFunction')
const { query } = require('express');
const pg_connection = require('../models/database');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res, next) {
  var uname = req.body.username
  var passwd = req.body.password
  var auth = await authen(uname, passwd)
  if (auth==true)
  {
    var tableString = await displayTable(req.body.username);
    res.render('user',
               {message: "hello\n",
               table: tableString}
              )
  }else
  {
    res.render('login', {message: "Incorrect username or password"})
  }
});

router.get('/delete', async function(req, res, next) {
  const queryObject = url.parse(req.url, true).query;
  var id = parseInt(queryObject['id'])
  var user = queryObject['user']
  await deleteAction(id)
  var tableString = await displayTable(user);
  res.render('user',
               {message: "List\n",
               table: tableString}
            )
});

router.post('/add', async function(req, res, next) {
  console.log(req.body)
  const queryObject = url.parse(req.url, true).query;
  var user = queryObject['user']
  await addFunction(req.body)
  var tableString = await displayTable(user);
  res.render('user',
               {message: "List\n",
               table: tableString}
            )
});

// router.get('/add', function(req, res){
//   res.render('add');
// });
// router.post('/add', function(req, res){
//   pg_connection.query(`insert into product (product_id, product_name, product_price, product_quantity, role)
//                         values ('${req.body.id}', '${req.body.name}', '${req.body.price}', '${req.body.quantity}', '${req.body.role}')`,
//                         function(err){
//                           if(err) throw err;
//                           res.redirect("/")
//                         })
// })

// router.get("/edit/:id", function(req, res){
//   var data = pg_connection.query(`select * from product where id = ${req.params.id}`, function(err, result){
//     if(err) throw err;
//     data = {
//       product_id:result[0].product_id,
//       product_name:result[0].product_name,
//       product_price:result[0].product_price,
//       product_quantity:result[0].product_quantity,
//       role:result[0].role
//     }
//     res.render('user', {data});
//   })
// })

// router.post("/edit", function(req, res){
//   pg_connection.query(`Update product set product_id = '${req.body.product_id}', product_name = '${req.body.product_name}', 
//                                           product_price = '${req.body.product_price}', product_quantity = '${req.body.product_quantity}', 
//                                           role = '${req.body.role}'`, function(err){
//     if(err) throw err;
//     res.render('user',
//                {message: "List\n",
//                table: tableString}
//             )
//   })
// })

router.post('/edit', async (req,res,next)=>{
  console.log(req.body);
  var id = req.body.product_id;
  console.log(id)
  const queryObject = url.parse(req.url, true).query
  var user = queryObject['user']
  await editFunction(id, req.body)
  var tableString = await displayTable(user)
  res.render('user', 
              {message: "Edited Successfully\n",
              table: tableString}
            )
})
module.exports = router;
