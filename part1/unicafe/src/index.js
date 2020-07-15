import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, onClick}) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = 100 * good / all
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {good} <br></br>
        neutral {neutral} <br></br>
        bad {bad} <br></br>
        all {all}<br></br>
        average {average}<br></br>
        positive {positive} %<br></br>
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' onClick={()=>setGood(good+1)}/>
      <Button name='neutral' onClick={()=>setNeutral(neutral+1)}/>
      <Button name='bad' onClick={()=>setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
