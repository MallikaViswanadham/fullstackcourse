const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
var date_time = Date();
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Part3, Backend</h1>')
})
app.get('/api/persons',(request,response)=>{
    response.json(persons);
})
app.get('/api/persons/:id',(req,res)=>{
  let id = Number(req.params.id);
  //console.log(id);
  let person = persons.find(person=> person.id ===id);
  if(person){
  res.send(person);
  }
  else{
    res.status(404).end();
  }
})

app.delete('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id);
   persons = persons.filter(p=>p.id !==id);
  res.status(204).end()

})

app.get('/info',(req,res)=>{
  let lengt = persons.length;
  console.log(lengt);
  res.send(`<p>Phonebook has info for ${lengt} people</p> <br> <p>${date_time}</p>`)
})

const generateId =()=>{
  const id= Math.random();
  console.log(id);
  return id;
}

app.post('/api/persons',(req,res)=>{
  let body = req.body;
  if(!body.name){
    res.status(404).json({
      error:"content is missing"
    })
   // return
  }
//  const name= persons.map(p=>p.name)
//  console.log(name,body.name)
  // if(body.name === name){
  //   res.status(404).json({
  //     error:"it must be unique"
  //   })
  // }
  const person ={
    id :generateId(),
    name:req.body.name,
    number:req.body.number,
  }
  
    persons.push(person);
   res.json(person);
   console.log("post is successfull")
  
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)


const port = 3002
app.listen(port,()=>{
    console.log("port running at 3002")
})