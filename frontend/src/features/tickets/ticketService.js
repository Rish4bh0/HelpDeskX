import axios from 'axios'

const API_URL = '/api/tickets/'

// Create new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

// Get user tickets
const getTickets = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}
// Get user tickets
const getTicketss = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + '/my', config)

  return response.data
}

// Get user ticket
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}
// Get all tickets
export const getAllTickets = async token => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const response = await axios.get(API_URL + '/all', config);
    return response.data;
  } catch (error) {
    console.error("Error fetching all tickets:", error);
    return [];
  }
};

// Close ticket
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(
    API_URL + ticketId,
    { status: 'close' },
    config
  )

  return response.data
}

// review ticket
const reviewTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(
    API_URL + ticketId,
    { status: 'review' },
    config
  )

  return response.data
}

// Update ticket
export const updateTicket = async (ticketId, updatedTicketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}${ticketId}`,
    updatedTicketData,
    config
  );

  return response.data;
};


const ticketService = {
  createTicket,
  getTickets,
  getTicketss,
  getTicket,
  closeTicket,
  getAllTickets,
  updateTicket,
  reviewTicket
}

export default ticketService
