const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv

const url =
  `mongodb+srv://fullstack:${password}@cluster0.5umq4po.mongodb.net/Personapp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Mallika',
  number : 7995170339
})


person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})
// Person.find({}).then(result => {
//   result.forEach(person => {
//     console.log(person)
//   })
//   mongoose.connection.close()
// })