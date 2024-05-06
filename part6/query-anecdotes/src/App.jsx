import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import  {getAll,updateAnecdote}  from "./requests";
import { useQueryClient, useMutation } from "@tanstack/react-query";


const App = () => {

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateAnecdote,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });




  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, 'votes': anecdote.votes +1})
  };


  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAll
  });


  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server.</div>;
  }


  const anecdotes = result.data

  // const anecdotes = [{'content': 'oi', 'votes': 0}]
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
