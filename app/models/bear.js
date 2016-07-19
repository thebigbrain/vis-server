import { Schema } from 'mongoose'

var BearSchema   = new Schema({
    name: String
});

BearSchema.methods.sayHello = () => {
	console.log("hello bear!")
}

module.exports = mongoose.model('Bear', BearSchema);