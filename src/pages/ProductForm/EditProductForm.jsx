import {
  FormLabel,
  FormControl,
  FormSelect,
} from "../../components/Form/FormElements";
import { UploadProfilePicture } from "../../components/Form/UsersFormElements";
import { BtnFormProduct } from "../../components/Form/ProductsFormElements";
import { Form, Row, Col, Image } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavbarPlain, BackButton } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProductForm() {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState(null);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `https://easy-school-uniform-ant.cyclic.app/api/v1/seller/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setName(res.data.data.name);
      setPicture(res.data.data.picture);
      setPrice(res.data.data.price);
      setLocation(res.data.data.location);
      setDescription(res.data.data.description);
      setCategory(res.data.data.CategoryProduct.id);
    } catch (err) {}
  };

  async function handleEdit(e) {
    e.preventDefault();
    const form = new FormData();

    form.append("name", name);
    form.append("picture", picture);
    form.append("price", price);
    form.append("location", location);
    form.append("description", description);
    form.append("id_category_product", category);

    try {
      const res = await axios.put(
        `https://easy-school-uniform-ant.cyclic.app/api/v1/seller/product/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/daftar-jual");
      toast("Produk berhasil diubah", {
        type: "success",
      });
    } catch (err) {
      if (Array.isArray(err.response.data.message)) {
        err.response.data.message.forEach((err) => {
          toast(err, {
            type: "error",
          });
        });
      } else {
        toast(err.response.data.message, {
          type: "error",
        });
      }
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <NavbarPlain title="Lengkapi Info Produk" />
      <ToastContainer />
      <BackButton />
      <Container className="mt-5 py-5">
        <Form onSubmit={handleEdit}>
          <Form.Group className="mt-4 mb-2">
            {picture == null ? (
              <UploadProfilePicture className="mx-auto" />
            ) : (
              <div className="d-flex justify-content-center">
                <Image className="imgPreviewProduct" src={picture} />
              </div>
            )}
          </Form.Group>
          <Form.Group className="mt-4 mb-2">
            <FormLabel>Nama Produk</FormLabel>
            <FormControl
              type="text"
              placeholder="Nama Produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-2">
            <FormLabel>Harga Produk</FormLabel>
            <FormControl
              type="text"
              placeholder="Rp. 0,00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-2">
            <FormLabel>Kategori</FormLabel>
            <FormSelect
              onChange={(e) => {
                const selectedCategory = e.target.value;
                setCategory(selectedCategory);
              }}
            >
              <option selected={category === 1 ? "selected" : ""} value={1}>
                Hobi
              </option>
              <option selected={category === 2 ? "selected" : ""} value={2}>
                Kendaraan
              </option>
              <option selected={category === 3 ? "selected" : ""} value={3}>
                Baju
              </option>
              <option selected={category === 4 ? "selected" : ""} value={4}>
                Elektronik
              </option>
              <option selected={category === 5 ? "selected" : ""} value={5}>
                Kesehatan
              </option>
            </FormSelect>
          </Form.Group>
          <Form.Group className="mt-4 mb-2">
            <FormLabel>Lokasi</FormLabel>
            <FormControl
              type="text"
              placeholder="Lokasi Produk"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-2">
            <FormLabel>Deskripsi</FormLabel>
            <FormControl
              as="textarea"
              placeholder="Contoh: Produk Penghilang Rorombeheun"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-2">
            <FormLabel>Foto Produk</FormLabel>
            <FormControl
              className="mx-auto"
              type="file"
              id="picture"
              onChange={(e) => setPicture(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group>
            <Row>
              <Col>
                <BtnFormProduct
                  className="mt-2 mb-4"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </BtnFormProduct>
              </Col>
              <Col>
                <BtnFormProduct className="mt-2 mb-4" type="submit">
                  Submit
                </BtnFormProduct>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default EditProductForm;
