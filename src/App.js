import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import DeleteContact from "./components/DeleteContact";
import EditContact from "./components/EditContact";

const BASE_URL = "http://localhost:3006";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getAllContacts = async () => {
    const response = await fetch(`${BASE_URL}/contacts`);
    const data = await response.json();
    if (data) {
      setContacts(data);
    }
  }

  const addContactHandler = async (contact) => {
    const data = {
      id: uuidv4(),
      name: contact.name,
      email: contact.email
    }

    const response = await fetch(`${BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    setContacts([...contacts, result]);
  };

  const updateContactHandler = async (contact) => {
    const response = await fetch(`${BASE_URL}/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })

    const result = await response.json();

    setContacts(contacts.map(contact => {
      return contact.id === result.id ? { ...result } : contact;
    }))
  }

  const removeContactHandler = async (id) => {
    const response = await fetch(`${BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json()
    console.log(data);

    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  useEffect(() => {
    const searchHandler = (searchTerm) => {
      const newContactList = contacts.filter(contact => {
        return Object.values(contact)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    searchHandler(searchTerm);
  }, [searchTerm]);

  // Retrive the contancts from the local storage
  useEffect(() => {
    // -- This code is for local storage
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    // --
    getAllContacts();
  }, []);

  // set the contacts in the local storage
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                removeContactHandler={removeContactHandler}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
          <Route
            path="/delete/:id"
            render={(props) => (
              <DeleteContact
                {...props}
                removeContactHandler={removeContactHandler}
              />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
