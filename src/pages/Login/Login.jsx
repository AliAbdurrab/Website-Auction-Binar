import { useState, useEffect } from "react";
import { NavbarPlain } from "../../components";
import { BtnSubmit } from "../../components/Buttons/ButtonElements";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import swal from "sweetalert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [token]);

  const login = () => {
    axios
      .post("https://easy-school-uniform-ant.cyclic.app/api/v1/auth/login", {
        email: String(email.target.value),
        password: String(password.target.value),
      })
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        swal("Anda berhasil masuk!", {
          icon: "success",
        });
      })
      .catch((error) => {
        if (Array.isArray(error.response.data.message)) {
          error.response.data.message.forEach((err) => {
            toast(err, {
              type: "error",
            });
          });
        } else {
          toast("email or password are wrong", {
            type: "error",
          });
        }
      });
  };

  return (
    <>
      <NavbarPlain title="Login" />
      <ToastContainer />
      <div className="auth-wrapper">
        <div className="auth-inner">
          {!isLoggedIn ? (
            <form className="textContent">
              <h3 className="textTitle">Log In</h3>
              <div className="mb-3">
                <label>Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email or Name"
                  onChange={setEmail}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={setPassword}
                />
              </div>
              <div className="d-grid">
                <BtnSubmit className="w-100" onClick={login}>
                  Submit
                </BtnSubmit>
              </div>
              <div className="mt-3 text-end">
                <p>
                  don't have an account?&nbsp;
                  <a className="font-login" href="/sign-up">
                    Register here
                  </a>
                </p>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Login;
