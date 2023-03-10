import { useState } from 'react'
import Button from './Button'
import Statistics from './Statistics '

const App = () => {
  

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlerGood = () => {
    setGood(good +1);
    console.log(good);
  }
  const handlerNeutral = () => {
    setNeutral(neutral +1);
    console.log(neutral);
  }
  
  const handlerBad = () => {
    setBad(bad +1);
    console.log(bad);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler = {handlerGood} name = {'good'} />
      <Button handler = {handlerNeutral} name = {'neutral'} />
      <Button handler = {handlerBad} name = {'bad'} />
      <h1>statistics</h1>  
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App