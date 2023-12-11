import React from "react";

export default function Home() {
  const [form, setForm] = React.useState({
    name: "",
    author: "",
    title: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
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
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}
