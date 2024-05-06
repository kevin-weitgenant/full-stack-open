import { useQueryClient, useMutation} from "@tanstack/react-query";
import {createNew} from "../requests"
import { useContext } from "react";
import NotificationContext from "../NotificationContext";



const AnecdoteForm = () => {

  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: () =>{
      notificationDispatch({ type: "ERROR"});
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000); 
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
    notificationDispatch({ type: "CREATE", payload: content });

    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" });
    }, 5000); // 5 seconds delay
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
