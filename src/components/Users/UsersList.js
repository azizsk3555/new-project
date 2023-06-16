import React from "react";
import classes from "./UsersList.module.css";
import Card from "../UI/Card";

const UserList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => {
          const key = Math.random();
          console.log(key);
          return (
            <li key={key}>
              {user.name} ({user.age} years old)
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default UserList;
