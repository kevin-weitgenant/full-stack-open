import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from "../reducers/NotificationReducer";
import AnecdoteService from "../services/anecdotes"



const AnecdoteForm = () => {

const dispatch = useDispatch()


const create = async (event)=>{
  event.preventDefault();
  const content = event.target.anecdote.value;
  event.target.anecdote.value = '';
  const newAnecdote = await AnecdoteService.createNew(content)
  dispatch(createAnecdote(newAnecdote));

  dispatch(setNotification(`you created anecdote: '${newAnecdote.content}'`));
  setTimeout(() => {
    dispatch(clearNotification());
  }, 5000); // Clears the notification after 5 seconds
}




return (
    <>
    <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
)



}

export default AnecdoteForm