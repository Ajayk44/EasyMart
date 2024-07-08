import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import toast from "react-hot-toast";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [shortdesc, setShortDesc] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await collection(db, "products");

      const storageRef = ref(
        storage,
        `productImages/${Date.now() + image.name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        () => {
          toast.error("Images not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: title,
              shortDesc: shortdesc,
              description: desc,
              category,
              price,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Product added successfully");
      navigate("/dashboard/all-products");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          {loading ? (
            <Col lg="12" className="text-center">
              <h5 className="fw-bold">Loading....</h5>
            </Col>
          ) : (
            <Col lg="12">
              <h4 className="mb-5">Add Product</h4>
              <Form onSubmit={addProduct}>
                <FormGroup className="form__group">
                  <span>Product title</span>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Short Description</span>
                  <input
                    type="text"
                    placeholder="Enter Short Description...."
                    value={shortdesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <span>Description</span>
                  <input
                    type="text"
                    placeholder="Enter Description...."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                  />
                </FormGroup>

                <div className="d-flex align-items-center justify-content-between gap-5">
                  <FormGroup className="form__group w-50">
                    <span>Price</span>
                    <input
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group w-50 ">
                    <span>Category</span>
                    <select
                      className="w-100 p-2"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Select category</option>
                      <option value="sofa">Sofa</option>
                      <option value="mobile">Mobile</option>
                      <option value="chair">Chair</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </FormGroup>
                </div>

                <div>
                  <FormGroup className="form__group">
                    <span>Product Image</span>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </FormGroup>
                </div>

                <button className="shop__btn " type="submit">
                  Add Product
                </button>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
