import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../loading";
import { createProduct, getProductById } from "../../actions/productAction";
import { getCategories } from "../../actions/categoryAction";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { decimalFormatter } from "../../Component/Helpers";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function CreateProduct(props) {
  //dispatcer & state metode hook
  const history = useHistory();
  const dispatch = useDispatch();
  const [imageName, setImageName] = useState("Choose Image");
  const [srcImage, setSrcImage] = useState("");
  let { id } = useParams();

  const [formProduct, setFormProduct] = useState({
    product_id: "",
    product_id: "",
    product_name: "",
    stock: 0,
    cogs: 0,
    price: 0,
    status: 1,
    distributor: "PRIVATE",
    descriptionProduct: "",
    seq: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(createProduct(formProduct))
          .then(({ msg }) => {
            showSuccess(msg);
            history.push("/product");
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };
  const onChangeDesc = (value) => {
    setFormProduct({ ...formProduct, descriptionProduct: value });
  };
  const onChangeFile = (e) => {
    let selectedFile = e.target.files[0];
    setImageName(selectedFile.name);
    setFormProduct({ ...formProduct, [e.target.name]: selectedFile });
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

  const {
    getCategoriesError,
    getCategoriesLoading,
    getCategoriesResult,
  } = useSelector((state) => state.CategoryReducer);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(getProductById(id))
      .then((data) => {
        setFormProduct(data.data);
      })
      .catch((err) => {
        console.error(err);
        showError(err.message);
      });
  }, []);

  // useEffect(() => {
  //   console.log(formProduct);
  // });

  return (
    <div className="content-wrapper">
      <ContentHeader title="Create Product" parentTitle="Product" />
      <section className="content">
        <NavLink to="/product/" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Product</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-2">
                  <small>Product ID</small>
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    id="product_id"
                    name="product_id"
                    placeholder="Product ID"
                    maxLength="4"
                    value={formProduct.product_id}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col-3">
                  {getCategoriesLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <small>Category</small>
                      <select
                        className="form-control form-control-sm "
                        id="category_id"
                        name="category_id"
                        placeholder="Category"
                        value={formProduct.category_id}
                        onChange={(e) =>
                          setFormProduct({
                            ...formProduct,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option value="DEFAULT">-- Select Category --</option>
                        {getCategoriesResult.data ? (
                          getCategoriesResult.data.length < 1 ? (
                            <option disabled={true}>No Data</option>
                          ) : (
                            getCategoriesResult.data.map((category) => (
                              <option
                                key={category.category_id}
                                value={category.category_id}
                              >
                                {category.category_id +
                                  " - " +
                                  category.category_name}
                              </option>
                            ))
                          )
                        ) : getCategoriesError ? (
                          <option disabled={true}>Error</option>
                        ) : (
                          <option disabled={true}>
                            Error When Parsing Data
                          </option>
                        )}
                      </select>
                    </>
                  )}
                </div>
                <div className="form-group col-7">
                  <small>Product Name</small>
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    id="product_name"
                    name="product_name"
                    placeholder="Product Name"
                    maxLength="50"
                    value={formProduct.product_name}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-1">
                  <small>Stock</small>
                  <input
                    type="number"
                    className="form-control form-control-sm "
                    id="stock"
                    name="stock"
                    placeholder="Stock"
                    maxLength="4"
                    // disabled={flgAutoStock}
                    disabled={true}
                    value={formProduct.stock}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group col-3">
                  <small>Cogs</small>
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    id="cogs"
                    name="cogs"
                    placeholder="Basic Price"
                    value={formProduct.cogs}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        [e.target.name]: decimalFormatter(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="form-group col-3">
                  <small>Price</small>
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    id="price"
                    name="price"
                    placeholder="Sell Price"
                    value={formProduct.price}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
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
                    value={formProduct.status}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
                        [e.target.name]: e.target.value,
                      })
                    }
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak aktif</option>
                  </select>
                </div>
                <div className="form-group col-3">
                  <small>Distributor</small>
                  <input
                    type="text"
                    className="form-control form-control-sm "
                    id="distributor"
                    name="distributor"
                    placeholder="Distributor"
                    maxLength={100}
                    value={formProduct.distributor}
                    onChange={(e) =>
                      setFormProduct({
                        ...formProduct,
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
                    id="descriptionProduct"
                    name="descriptionProduct"
                    style={{ height: "200px", marginBottom: "20px" }}
                    value={formProduct.descriptionProduct}
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
                    value={formProduct.description}
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
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CreateProduct;
