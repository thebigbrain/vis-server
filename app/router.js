import path from 'path'
import fs from 'fs'
import os from 'os'
import parse from './core/busboy'
import stream from 'stream'

const Writable = stream.Writable

class MyWritable extends Writable {
  constructor(options) {
    // Calls the stream.Writable() constructor
    super(options);
  }

  _write (chunk, endoding, callback) {
    console.log(chunk.values())
    if(callback) callback()
  }
}

var router = require('koa-router')();

function test(ctx) {
    var request = ctx.req
    request.pipe(new MyWritable())
}

router.post('/image', async function(ctx, next) {
	console.log(ctx.req.body)
    if (!ctx.request.is('multipart/*')) return await next()

    //test(ctx)

    var parts = parse(ctx)
    /*var part
    while (part = await parts()) {
        if (part.length) {
            // arrays are busboy fields
            console.log('key: ' + part[0])
            console.log('value: ' + part[1])
        } else {
            // otherwise, it's a stream
            part.pipe(fs.createWriteStream('file.jpg'))
        }
    }
    console.log('and we are done parsing the form!')*/
    next()
})

router.prefix('/api')

export default router
