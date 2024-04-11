
import './App.css';
import { useState} from "react"

const Header =(props)=>{
  return(
    <h1 className='header'>{props.name}</h1>
  )
}

const Button=({onClick,text})=>{
  return(
  <button onClick={onClick}>
    {text}
  </button>
  )
}

const Anecdote=(props)=>{
return(
  <div>
  <p>{props.text}</p>
  <p>has {props.votes} votes</p>
  </div>
)
}

const Winner = ({ anecdotes, votes})=>{
  
  const maximum =Math.max(...votes);
  const winnerindex = votes.indexOf(maximum);
  const maxanecdote = anecdotes[winnerindex];
  console.log(maxanecdote);
  if(votes===0){
    return(
      <p>No votes yet</p>
    )
  }
  return(
    <>
    <p>{maxanecdote}</p>
    <p>has {maximum} votes</p>
    </>
  )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  let  [selected, setSelected] = useState(0)
  let [votes, setvotes]=useState(Array(8).fill(0))
  
  const handlevotes=()=>{
    const newvotes=[...votes]
    newvotes[selected] += 1
    setvotes(newvotes)
  }

  const Display =()=>{
    let index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  }

  return (
    <div>
      <Header name="Anecdote of the day"/>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={Display} text="next anecdote"/>
      <Button onClick={handlevotes} text="vote"/>
      <Header name="Anecdote with most votes"/>
      <Winner anecdotes={anecdotes} votes={votes} />

    </div>
  )
}

export default App;
