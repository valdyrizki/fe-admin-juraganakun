import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import Spinner from "../loading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { decimalFormatter } from "../../Component/Helpers";
import InputField from "../../Component/Forms/InputField";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function EditProduct(props) {
  //dispatcer & state metode hook
  const history = useHistory();
  const [imageName, setImageName] = useState("Choose Image");
  const [srcImage, setSrcImage] = useState("");
  let { id } = useParams();

  const [productForm, setProductForm] = useState({});
  const [error, setError] = useState({});
  const [productLoading, setProductLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    showConfirm(async function(confirmed) {
      console.log(productForm);
      if (confirmed) {
        setSaveLoading(true);
        try {
          const { data } = await ProductService.updateProduct(productForm);
          if (data.success) {
            showSuccess(data.message);
            history.push("/product");
          } else {
            let response = data.response.data;
            showError(response.message);
          }
        } catch ({ response }) {
          try {
            if (response.data.error) {
              setError(response.data.error);
            } else if (response.data.message) {
              showError(response.data.message);
            } else {
              showError(response);
            }
          } catch (error) {
            console.error(error);
            showError("Error sistem, hubungi admin WA : +6283818213645");
          }
        }
        setSaveLoading(false);
      }
    });
  };

  const onChangeDesc = (value) => {
    setProductForm({ ...productForm, description: value });
  };

  const onChangeFile = (e) => {
    let selectedFile = e.target.files[0];
    setImageName(selectedFile.name);
    setProductForm({ ...productForm, [e.target.name]: selectedFile });
    console.log(selectedFile);
    // load preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setSrcImage(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  const doRemoveImg = () => {
    setImageName("Choose Image");
    setSrcImage("");
  };

  const getCategories = async () => {
    //request api
    setCategoriesLoading(true);
    try {
      const { data } = await CategoryService.getAll(); //axios call API
      if (data.success) {
        setCategories(data.data);
      } else {
        let response = data.response.data;
        showError(response.message);
      }
    } catch ({ response }) {
      try {
        if (response.data.message) {
          showError(response.data.message);
        } else {
          showError(response);
        }
      } catch (error) {
        console.error(error);
        showError("Error sistem, hubungi admin WA : +6283818213645");
      }
    }
    setCategoriesLoading(false);
  };

  const getProductById = async () => {
    //request api
    setProductLoading(true);
    try {
      const { data } = await ProductService.getProductByCode(id); //axios call API
      console.log(data);
      if (data.success) {
        setProductForm(data.data);
        setSrcImage(process.env.REACT_APP_BE_URL + "/" + data.data.path);
      } else {
        let response = data.response.data;
        showError(response.message);
      }
    } catch ({ response }) {
      try {
        if (response.data.message) {
          showError(response.data.message);
        } else {
          showError(response);
        }
      } catch (error) {
        console.error(error);
        showError("Error sistem, hubungi admin WA : +6283818213645");
      }
    }
    setProductLoading(false);
  };

  useEffect(() => {
    getProductById();
    getCategories();
  }, []);

  return (
    <div className="content-wrapper">
      <ContentHeader title="Create Product" parentTitle="Product" />
      <section className="content">
        <NavLink to="/product" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Product</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            {productLoading ? (
              <Spinner />
            ) : (
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-3">
                    {categoriesLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <small>Category</small>
                        <select
                          className="form-control form-control-sm "
                          id="category_id"
                          name="category_id"
                          placeholder="Category"
                          value={productForm.category_id}
                          onChange={(e) =>
                            setProductForm({
                              ...productForm,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          <option value="DEFAULT">-- Select Category --</option>
                          {categories.length < 1 ? (
                            <option disabled={true}>No Data</option>
                          ) : (
                            categories.map((category) => (
                              <option
                                key={category.category_id}
                                value={category.category_id}
                              >
                                {category.category_id +
                                  " - " +
                                  category.category_name}
                              </option>
                            ))
                          )}
                        </select>
                      </>
                    )}
                  </div>
                  <div className="form-group col-2">
                    <InputField
                      type="text"
                      id="product_id"
                      name="product_id"
                      placeholder="Product ID"
                      label="Product ID"
                      error={error.product_id}
                      value={productForm.product_id}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-7">
                    <InputField
                      type="text"
                      id="product_name"
                      name="product_name"
                      placeholder="Product Name"
                      label="Product Name"
                      error={error.product_name}
                      value={productForm.product_name}
                      maxLength="50"
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-1">
                    <InputField
                      type="number"
                      id="stock"
                      name="stock"
                      placeholder="Stock"
                      label="Stock"
                      error={error.stock}
                      value={productForm.stock}
                      maxLength="4"
                      disabled={true}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-3">
                    <InputField
                      type="text"
                      id="cogs"
                      name="cogs"
                      placeholder="Basic Price"
                      label="Basic Price"
                      error={error.cogs}
                      value={productForm.cogs}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          [e.target.name]: decimalFormatter(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-3">
                    <InputField
                      type="text"
                      id="price"
                      name="price"
                      placeholder="Sell Price"
                      label="Sell Price"
                      error={error.price}
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          [e.target.name]: decimalFormatter(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-2">
                    <small>Status</small>
                    <select
                      className="form-control form-control-sm "
                      id="status"
                      name="status"
                      placeholder="Status"
                      value={productForm.status}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      <option value="1">Aktif</option>
                      <option value="0">Tidak aktif</option>
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <InputField
                      type="text"
                      id="distributor"
                      name="distributor"
                      placeholder="Distributor"
                      label="Distributor"
                      error={error.distributor}
                      maxLength={100}
                      value={productForm.distributor}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          [e.target.name]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12">
                    <small>Description</small>
                    <ReactQuill
                      onChange={onChangeDesc}
                      theme="snow"
                      id="description"
                      name="description"
                      style={{ height: "200px", marginBottom: "20px" }}
                      value={productForm.description}
                    />
                    {/* <input type="text" onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="description" name="description" placeholder="Description"/> */}
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="form-group col-12">
                    <input
                      type="file"
                      onChange={(e) => onChangeFile(e)}
                      className="custom-file-input"
                      id="image"
                      name="image"
                      value=""
                    />
                    <label className="custom-file-label" id="fileName">
                      {imageName}
                    </label>
                  </div>
                </div>
                <div className="row mt-4">
                  {srcImage ? (
                    <div className="col-12 text-center">
                      <div className="row">
                        <div className="col text-center">
                          <img
                            src={srcImage}
                            alt="Preview"
                            width="200px"
                            height="200px"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col text-center">
                          <p className="btn btn-danger" onClick={doRemoveImg}>
                            X
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}

            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saveLoading}
              >
                {saveLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    {" ... Creating Product"}
                  </>
                ) : (
                  <>
                    <i className="fas fa-save"></i> Edit Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default EditProduct;
