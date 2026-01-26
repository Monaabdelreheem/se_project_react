const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const getToken = () => {
  return localStorage.getItem("jwt");
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// public route 
export const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers,
  });
};

// protected route
export const addItem = ({ name, imageUrl, weather}) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: { ...headers, authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

// protected route
export const removeItem = (itemId) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${getToken()}` },
  });
};

export const addCardLike = (itemId) => {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: { ...headers, authorization: `Bearer ${getToken()}` },
  });
};

export const removeCardLike = (itemId) => {
  return request(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${getToken()}` },
  });
};

export const register = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const authorize = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
};

export const getContent = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { ...headers, authorization: `Bearer ${token}` },
  });
};

export const updateUserProfile = ({ name, avatar }) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: { ...headers, authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ name, avatar }),
  });
};  