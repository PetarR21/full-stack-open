import { useState } from 'react';

const Display = ({ text }) => {
  return <h1>{text}</h1>;
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = ({ text }) => {
  return <div>{text}</div>;
};

const Votes = ({ points }) => {
  return <div>has {points} votes</div>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(10));
  const [mostVotes, setMostVotes] = useState(0);

  return (
    <div>
      <Display text='Anecdote of the day' />
      <Anecdote text={anecdotes[selected]} />
      <Votes points={points[selected]} />
      <Button
        text='vote'
        onClick={() => {
          const copy = [...points];
          copy[selected] += 1;
          setPoints(copy);
          setMostVotes(copy.indexOf(Math.max(...copy)));
        }}
      />
      <Button
        text='next anecdote'
        onClick={() => {
          setSelected(parseInt(Math.random() * anecdotes.length));
        }}
      />
      <Display text='Anecdote with most votes' />
      <Anecdote text={anecdotes[mostVotes]} />
      <Votes points={points[mostVotes]} />
    </div>
  );
};

export default App;
