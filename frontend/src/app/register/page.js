"use client";
import { useState } from "react";
import axios from "axios";
import { urlRegister } from "@/utils/urls";
import Header from "../components/Header";

export default function Register() {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setUsename("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      userName: username,
      password: password,
    };
    await axios.post(urlRegister, data).then((response) => {
      if (response.status === 201) {
        window.alert("User created, back to home page");
      }
      console.log(response.status);
    });

    resetForm();
  };

  return (
    <div>
      <Header />
      <div className="mx-auto mx-w-2xl px-4 my-10">
        <h1>Register</h1>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className=" w-[40vw]  flex flex-col">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              autoComplete="off"
              value={username}
              onChange={({ target }) => setUsename(target.value)}
              id="name"
              minLength={4}
              className="bg-gray-500"
            />
          </div>

          <div className=" w-[40vw] flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              id="password"
              minLength={4}
              className="bg-gray-500"
            />
          </div>
          <button className="px-4 py-2  bg-blue-400 font-col font-medium mt-4 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
