import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  const anecdotes = useSelector((state) => {
    // First, filter anecdotes based on the filter state if it is not empty
    const filteredAnecdotes = state.anecdotes.filter(anecdote =>
        state.filter ? anecdote.content.toLowerCase().includes(state.filter.toLowerCase()) : true
    );

    // Then sort the filtered anecdotes by votes in descending order
    return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
});

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
