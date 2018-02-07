const Router = require('koa-router');
const query = require('../../database/queries.js');
const router = new Router();

// router.get('/', async(ctx)=> {

// 	try {
// 		ctx.body = await query.getBooking('user_id', 10);
	
// 		ctx.body = ctx.body.rows[0];
// 		let data = ctx.body;
// 		let row = `id: ${data.id}\nuser_id: ${data.user_id}\nprice: ${data.price}\ndate_ms: ${data.date_ms}\n`;

// 	    console.log('query result:\n', row);

// 	}
// 	catch(error) {
// 		console.log(`error = ${error}`);
// 	}
// });

//without async

router.get('/', (ctx)=> {

	try {
		query.getAll('bookings','user_id', 10).then(function(results) { 
			ctx.body = results;
			console.log("results = ", results);
		});	

	} catch(error) {
		console.log(`error = ${error}`);
	}
});

module.exports = router;