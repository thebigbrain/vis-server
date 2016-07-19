import Koa from 'koa'
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import router from './router'
import logger from 'koa-logger'
import staticServe from 'koa-static'
import convert from 'koa-convert'

const app = new Koa()
export default app

const _use = app.use
app.use = (x) => _use.call(app, convert(x))

//app.use(logger())

app.use(staticServe(__dirname + '/public'));

app.use(bodyParser({
	onerror: (err, ctx) => {
		ctx.throw('body parse error', 422);
	}
}))
app.use(router.routes())

// response
app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

app.listen(3000, () => console.log('server started 3000'))

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('we\'re connected!')
});
