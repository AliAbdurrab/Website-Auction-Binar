import { useState, useEffect } from "react";
import { FormLabel, FormControl } from "../../components/Form/FormElements";
import { BtnFormUser } from "../../components/Form/UsersFormElements";

import { Form, Container, InputGroup } from "react-bootstrap";
import { NavbarPlain, BackButton } from "../../components";

import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import axios from "axios";

function EditPassword() {
  const [olds, setOlds] = useState("");
  const [news, setNews] = useState("");
  const [confirms, setConfirms] = useState("");

  const updatePassword = async (e) => {
    e.preventDefault();
    const data = {
      old_password: olds,
      new_password: news,
      confirm_password: confirms,
    };

    try {
      const response = await axios.put(
        "https://easy-school-uniform-ant.cyclic.app/api/v1/auth/user/password",
        data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      swal({
        title: "Berhasil!",
        text: "Password anda berhasil diubah!",
        icon: "success",
        button: "Oke",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
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
    }
  };

  return (
    <>
      <NavbarPlain title="Ubah Kata Sandi" />
      <ToastContainer />
      <BackButton />
      <Container className="mt-5 mb-2 pt-5">
        <Form className="pt-5" onSubmit={updatePassword}>
          <Form.Group>
            <FormLabel>Kata Sandi Lama*</FormLabel>
            <FormControl
              type="password"
              placeholder="masukkan kata sandi lama"
              required
              value={olds}
              onChange={(e) => setOlds(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <FormLabel>Kata Sandi Baru*</FormLabel>
            <FormControl
              type="password"
              placeholder="masukkan kata sandi baru"
              required
              value={news}
              onChange={(e) => setNews(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-2">
            <FormLabel>Konfirmasi Kata Sandi Baru*</FormLabel>
            <FormControl
              type="password"
              placeholder="konfirmasi kata sandi baru"
              required
              value={confirms}
              onChange={(e) => setConfirms(e.target.value)}
            />
          </Form.Group>
          <BtnFormUser className="mt-2 mb-4" type="submit">
            Submit
          </BtnFormUser>
        </Form>
      </Container>
    </>
  );
}

export default EditPassword;
