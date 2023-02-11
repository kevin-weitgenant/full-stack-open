else if (error.name === 'ValidationError') {
  return response.status(400).json({ error: error.message })