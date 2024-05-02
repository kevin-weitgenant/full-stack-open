import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from "../reducers/NotificationReducer";



const AnecdoteForm = () => {

const dispatch = useDispatch()


const create = (event)=>{
  event.preventDefault();
  const content = event.target.anecdote.value;
  dispatch(createAnecdote(content));

  dispatch(setNotification(`you created anecdote: '${content}'`));
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