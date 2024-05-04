import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, setAnecdotesStart} from "../reducers/anecdoteReducer";
import {
  setNotificationThunk
} from "../reducers/NotificationReducer";
import { useEffect } from "react";

const AnecdoteList = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setAnecdotesStart());
  }, []);

  const anecdotesVote = useSelector((state) => state.anecdotes);

  const vote = (id) => {
    const anecdoteVote = anecdotesVote.find((a) => a.id === id);
    if (anecdoteVote) {
      dispatch(voteAnecdote(id));

      // Set a notification with the content of the voted anecdote
      dispatch(setNotificationThunk(`you voted: '${anecdoteVote.content}'`, 5));
    }
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
