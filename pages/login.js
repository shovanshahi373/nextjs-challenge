import Layout from "../components/Layout";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter as Router } from "next/router";
import Messages from "../components/Messages";

const Login = () => {
  const router = Router();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateUser = () => {
    const messages = [];
    let user = localStorage.getItem(email);
    if (user) {
      user = JSON.parse(user);
      bcrypt.compare(password, user.password, function(err, res) {
        if (res === true) {
          console.log("user is valid");
          router.push(`/dashboard?name=${user.name}`, `/dashboard`);
        } else {
          console.log("password incorrect");
          messages.push({ msg: "incorrect credentials" });
          const msg = JSON.stringify([...messages]);
          router.push(`/login?msg=${msg}`, "/login");
        }
      });
    } else {
      messages.push({ msg: "unauthorized user" });
      const msg = JSON.stringify([...messages]);
      console.log("user doesn't exist");
      router.push(`/login?msg=${msg}`, "/login");
    }
  };

  return (
    <Layout>
      {router.query.msg ? <Messages msg={router.query.msg} /> : null}
      <div className='card'>
        <form
          method='POST'
          action=''
          className='card-body'
          onSubmit={e => e.preventDefault()}
        >
          <div className='form-group'>
            <input
              type='text'
              name=''
              id=''
              placeholder='example@example.com'
              className='form-control'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name=''
              id=''
              placeholder='password'
              className='form-control'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            className='btn btn-primary btn-block'
            onClick={() => validateUser()}
          >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default Login;
