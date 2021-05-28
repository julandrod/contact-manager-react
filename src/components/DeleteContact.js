import React from "react";
import { Link } from "react-router-dom";

const DeleteContact = (props) => {
  const { id } = props.location.state.contact;
  console.log(id);

  return (
    <div className="main">
      <div className="content">
        <div className="header center">
          <h1>Are you sure you want to delete this contact?</h1>
        </div>
        <div className="center">
          <Link to="/">
            <button 
                className="ui button center red mr-10" 
                onClick={() => props.removeContactHandler(id)}>Yes</button>
            <button className="ui button floated green">No</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteContact;