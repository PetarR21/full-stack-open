import { useState } from 'react';

const Display = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;

  if (all === 0) return <div>No feedback given</div>;

  const avg = (good * 1 + bad * -1) / all;
  const positive = good / all;

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={positive * 100 + '%'} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Display text='give feedback' />
      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
        text='good'
      />
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
        text='neutral'
      />
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
        text='bad'
      />
      <Display text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
