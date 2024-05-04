import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};


const createNew = async (content) => {
  const object = { content, votes : 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}


const updateAnecdote = async (anecdote) => {
  // Assuming that each anecdote object has an 'id' property
  const urlWithId = `${baseUrl}/${anecdote.id}`;

  try {
    const response = await axios.put(urlWithId, anecdote);
    return response.data;
  } catch (error) {
    console.error("Error updating the anecdote:", error);
    throw error; // Re-throw the error if handling is needed at a higher level
  }
};


const getAnecdoteById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching anecdote by ID:", error);
    throw error;
  }
};




export default { getAll, createNew, updateAnecdote, getAnecdoteById };



