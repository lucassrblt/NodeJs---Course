const sendData = async (data, url) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // Transforme l'objet JS en JSON
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const responseServer = await response.json();
    console.log(responseServer);
    return responseServer;
  } catch (error) {
    console.log(error);
  }
};

export default sendData;
