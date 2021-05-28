import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, removeContactHandler, searchTerm, setSearchTerm }) => {

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
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Contacts ..."
            className="prompt"
            value={searchTerm}
            onChange={((e) => setSearchTerm(e.target.value))}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {contacts.length > 0 ?
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              deleteContactHandler={deleteContactHandler}
            />
          )) :
          'No Contacts Available'}
      </div>
    </div>
  );
};

export default ContactList;
