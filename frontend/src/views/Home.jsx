import React from "react";

export default function Home() {
  const [form, setForm] = React.useState({
    name: "",
    author: "",
    subject: "",
  });

  const createArticle = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // Transforme l'objet JS en JSON
    };

    try {
      console.log(requestOptions.body);
      const url = "http://localhost:3001/api/createArticle";
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(response.status);
      }

      const responseServer = await response.json();
      console.log(responseServer);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    createArticle(form);
  };

  return (
    <div>
      <h1>Create Article</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label htmlFor="">Author</label>
        <input
          type="text"
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <label htmlFor="">Title</label>
        <input
          type="text"
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}
