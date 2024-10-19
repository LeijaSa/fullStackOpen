import { useState } from "react";

const Button = (props) => (
  <button style={{ margin: "5px" }} onClick={props.handleClick}>
    {props.text}
  </button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [maxPoints, setMaxPoints] = useState(0);
  const [voted, setVoted] = useState(-1);

  const getRandomNumber = () => {
    const nextNumber = Math.floor(Math.random() * 8);
    setSelected(nextNumber);
  };
  const voteAnecdote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    setAnecdoteWithMostPoints(newPoints);
  };
  const setAnecdoteWithMostPoints = (newPoints) => {
    const maxValue = Math.max(...newPoints);
    setMaxPoints(maxValue);
    const maxIndex = newPoints.indexOf(maxValue);
    setVoted(maxIndex);
  };

  return (
    <>
      <h1>Anecdote of the Day</h1>
      <div
        style={{
          width: "300px",
          height: "100px",
          marginBottom: "20px",
        }}
      >
        {anecdotes[selected]}
      </div>
      <br></br>
      <Button text="vote" handleClick={voteAnecdote} />
      <Button text="next anecdote" handleClick={getRandomNumber} />
      <h1>Anecdote with most votes</h1>
      {voted > -1 ? (
        <div>
          <p
            style={{
              width: "300px",
              height: "100px",
              marginBottom: "10px",
            }}
          >
            {anecdotes[voted]}
          </p>
          <p>has {maxPoints} votes</p>
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </>
  );
};

export default App;
