import Layout from "../components/Layout";
import bcrypt from "bcryptjs";
import { useState } from "react";
// import Router from "next/router";
import { useRouter as Router } from "next/router";
import Messages from "../components/Messages";

const Register = () => {
  const router = Router();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleFormSubmit = () => {
    const messages = [];
    if (name.length < 3) {
      messages.push({ msg: "name must be at least 3 characters long!" });
    }
    if (
      !email ||
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      messages.push({ msg: "email is missing or invalid!" });
    }
    if (password.length < 6 || password !== cpassword) {
      messages.push({
        msg: "passwords must be at least 6 characters and matched!"
      });
    }
    if (localStorage.getItem(email)) {
      messages.push({ msg: "user already exists!" });
    }
    if (messages.length) {
      const msg = JSON.stringify([...messages]);
      router.push(`/?msg=${msg}`, "/");
      // setName("");
      // setEmail("");
      // setPassword("");
      // setCpassword("");
      return;
    }
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) throw new Error("error while generating hash");
        const user = {
          name,
          email,
          password: hash
        };
        console.log(user);
        localStorage.setItem(email, JSON.stringify(user));
        console.log("successfully registered...");
        messages.push({ msg: "successfully registered.Login to continue." });
        const msg = JSON.stringify([...messages]);
        router.push(`/login?msg=${msg}`, "/login");
        setName("");
        setEmail("");
        setPassword("");
        setCpassword("");
      });
    });
  };

  return (
    <Layout>
      {router.query.msg ? <Messages msg={router.query.msg} /> : null}
      <div className='card'>
        <form
          className='card-body'
          method='POST'
          onSubmit={e => e.preventDefault()}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='name'
              className='form-control'
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='email'
              className='form-control'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='password'
              className='form-control'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='confirm password'
              className='form-control'
              onChange={e => setCpassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary btn-block'
            onClick={() => handleFormSubmit()}
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default Register;
