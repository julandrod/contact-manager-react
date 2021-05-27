import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = ({ contact, deleteContactHandler }) => {
  const { id, name, email } = contact;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={{pathname: `/contact/${id}`, state:{contact}}}>
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px" }}
        onClick={() => deleteContactHandler(id)}
      ></i>
    </div>
  );
};

export default ContactCard;
