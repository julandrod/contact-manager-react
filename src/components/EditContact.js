import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const EditContact = (props) => {
    console.log(props)
  const { id, name, email } = props.location.state.contact;

  const [contact, setContact] = useState({
    id,
    name,
    email,
  });

  const history = useHistory();

  const update = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("All the fields are mandatory");
      return;
    }
    props.updateContactHandler(contact);
    setContact({ name: "", email: "" });
    history.push("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>
            Name <span style={{ color: "red" }}>(*)</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
          />
        </div>
        <div className="field">
          <label>
            Email <span style={{ color: "red" }}>(*)</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
