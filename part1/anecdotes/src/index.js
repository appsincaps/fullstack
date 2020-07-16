import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, onClick}) => {
  return <button onClick={onClick}>{text}</button>
}

const Display = ({votes}) => {
  return <div>has {votes} votes.</div>
}

const randomInt = (max, min=0) => {
  return Math.floor(Math.random() * (max - min +1)) + min
}

const newVotes = (array, index) => {
  const newArray = [...array]
  newArray[index]++;
  return newArray
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
  console.log('selected=', selected)
  console.log('votes=', votes)
  return (
    <div>
      {props.anecdotes[selected]}
      <Display votes={votes[selected]} />
      <div>
        <Button text='vote' onClick={() => setVotes(newVotes(votes, selected))} />
        <Button text='next anecdote' onClick={() => setSelected(randomInt(props.anecdotes.length - 1))} />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
