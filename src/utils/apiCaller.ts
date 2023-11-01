export default function APICaller(
  endpointURL: string,
  methodType: string,
  body?: any
) {
  const token = localStorage.getItem("token");
  if (token) {
    if (methodType === "GET") {
      return fetch(endpointURL, {
        method: methodType,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      return fetch(endpointURL, {
        method: methodType,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  } else {
    const endPointArray = endpointURL.split("/");
    if (endPointArray[endPointArray.length - 1]) {
      return fetch(endpointURL, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    return console.log("No token found");
  }
}
