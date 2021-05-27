import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, removeContactHandler }) => {
  const deleteContactHandler = (id) => {
    removeContactHandler(id);
  };

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui right floated button blue">Add Contact</button>
        </Link>
      </h2>
      <div className="ui celled list">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            deleteContactHandler={deleteContactHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
