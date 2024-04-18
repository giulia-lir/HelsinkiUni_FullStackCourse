import { useState } from 'react'

const Title = (  {text} ) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ( {text, counter} ) => <div>{text} {counter}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [points, setPoints] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const addPoint = points + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setPoints(addPoint)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const minusPoint = points - 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
    setPoints(minusPoint)
  }

  return (
    <div>
      <Title text={'Give feedback'} />
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />

      <Title text={'Statistics'} />
      <Display text={'good'} counter={good} />
      <Display text={'neutral'} counter={neutral} />
      <Display text={'bad'} counter={bad} />
      <Display text={'all'} counter={total} />
      <Display text={'total points'} counter={points} />
      <Display text={'average'} counter={points / total} />
      <Display text={'positive'} counter={(good * 100 / total) + " %"} />
    </div>
  )
}



export default App