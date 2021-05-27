import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AddContact = ({ addContactHandler }) => {
  const [contact, setContact] = useState({ name: "", email: "" });

  const history = useHistory();

  const add = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("All the fields are mandatory");
      return;
    }
    console.log(history);
    addContactHandler(contact);
    setContact({ name: "", email: "" });
    history.push("/");
  };

  return (
    <div className="ui main">
      {console.log(contact)}
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
