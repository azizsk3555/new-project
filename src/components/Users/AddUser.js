import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [EnterUserName, setEnterUserName] = useState("");
  const [EnterAge, setEnterAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (EnterUserName.trim().length === 0 || EnterAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age(non-empty values).",
      });
      return;
    }
    if (+EnterAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age(> 1).",
      });
    }

    props.onAddUser(EnterUserName, EnterAge);
    setEnterUserName("");
    setEnterAge("");
  };

  const userChangeHandler = (event) => {
    setEnterUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnterAge(event.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            onChange={userChangeHandler}
            value={EnterUserName}
          ></input>
          <label htmlFor="age">(age Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={EnterAge}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
