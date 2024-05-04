import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {
  setNotificationThunk
} from "../reducers/NotificationReducer";




const AnecdoteForm = () => {

const dispatch = useDispatch()


const create = async (event)=>{
  event.preventDefault();
  const content = event.target.anecdote.value;
  event.target.anecdote.value = '';
  
  dispatch(createAnecdote(content));

  dispatch(setNotificationThunk(`you created anecdote: '${content}'`,5)); 
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