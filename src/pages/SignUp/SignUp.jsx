import { useState } from "react";
import { NavbarPlain } from "../../components";
import { BtnSubmit } from "../../components/Buttons/ButtonElements";
import { ToastContainer, toast } from "react-toastify";
import { FormFloating } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    axios
      .post("https://easy-school-uniform-ant.cyclic.app/api/v1/auth/register", {
        name: String(name.target.value),
        email: String(email.target.value),
        password: String(password.target.value),
      })
      .then((response) => {
        navigate("/login");
        swal({
          title: "Berhasil!",
          text: "Anda berhasil daftar!",
          icon: "success",
          button: "Oke",
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
          toast(error.response.data.message, {
            type: "error",
          });
        }
      });
  };

  return (
    <>
      <NavbarPlain title="Sign Up" />
      <ToastContainer />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <FormFloating className="textContent">
            <h3 className="textTitle">Sign Up</h3>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                onChange={setName}
                required
              />
            </div>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={setEmail}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={setPassword}
                required
              />
              <p className="textGray">
                kata sandi harus minimal 8 karakter dan mengandung setidaknya 1
                huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter khusus.
              </p>
            </div>
            <div className="d-grid">
              <BtnSubmit className="w-100" onClick={register}>
                Sign Up
              </BtnSubmit>
            </div>
            <p className="text-end mt-3">
              Already registered? <a href="/login">sign in</a>
            </p>
          </FormFloating>
        </div>
      </div>
    </>
  );
}

export default SignUp;
