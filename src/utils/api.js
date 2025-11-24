const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getItems = () => {
  return request(`${baseUrl}/items`, { headers });
    };

export const addItem = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};


export const removeItem = (itemId) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers,
  });
};
