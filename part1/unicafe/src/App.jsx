import { useState } from 'react'

const Title = (  {text} ) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ( {text, value} ) => <div>{text} {value}</div>

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral
  const average = (good - bad) / total
  const positivePercent = good * 100 / total
  
  return (
    <div>
      <Title text={'Statistics'} />
      <Display text={'good'} value={good} />
      <Display text={'neutral'} value={neutral} />
      <Display text={'bad'} value={bad} />
      <Display text={'all'} value={total} />
      {total > 0 && (
        <>
          <Display text={'average'} value={average} />
          <Display text={'positive'} value={positivePercent + " %"} />
        </>) 
      }
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Title text={'Give feedback'} />
      <Button handleClick={handleGoodClick} text={'good'} />
      <Button handleClick={handleNeutralClick} text={'neutral'} />
      <Button handleClick={handleBadClick} text={'bad'} />

      <Statistics bad={bad} good={good} neutral={neutral} />
    </div>
  )
}



export default App