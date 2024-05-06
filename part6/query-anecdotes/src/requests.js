import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

 export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};


 export const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};


export const updateAnecdote = async (anecdote) => {
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

