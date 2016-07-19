import Busboy from 'busboy'
import { inspect } from 'util'
import Promise from 'bluebird'

export default function(ctx, options) {
    var req = ctx.req,
        res = ctx.res

    if (req.method != "POST") return

    options = options || {}
    options.headers = req.headers

    var busboy = new Busboy(options)

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename)
        file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        })
        file.on('end', function() {
            console.log('File [' + fieldname + '] Finished')
        })
    })

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + inspect(val))
    })

    busboy.on('finish', function() {
        console.log('Done parsing form!');
        //res.writeHead(303, { Connection: 'close', Location: '/' })
        //res.end()

    })

    req.pipe(busboy)
}
