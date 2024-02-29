import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductOptionsByCategory,
  storeStock,
} from "../../actions/productAction";
import SelectBox from "../../Component/Selectbox";
import { getCategoryOptions } from "../../actions/categoryAction";
import Spinner from "../loading";

export default function Stock(props) {
  //dispatcer & state metode hook
  const history = useHistory();
  const [inputs, setInputs] = useState({
    files: [],
    category_id: "DEFAULT",
  });
  const [productsOption, setProductsOption] = useState([]);
  const [categoriesOption, setCategoriesOption] = useState([]);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("Choose File");
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { getCategoriesLoading } = useSelector(
    (state) => state.CategoryReducer
  );
  const { getProductsLoading, getProductLoading } = useSelector(
    (state) => state.ProductReducer
  );

  const onChangeText = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onChangeCategory = (e) => {
    onChangeText(e);
    getProductsByCategory(e.target.value);
  };

  const onChangeProduct = (e) => {
    onChangeText(e);
    let selectedIndex = e.target.selectedIndex;
    setStock(e.target[selectedIndex].getAttribute("attrb2"));
  };

  const onChangeFile = (e) => {
    console.log(e.target.files);
    setInputs({ ...inputs, "files[]": e.target.files });
    setFiles(e.target.files);
    setFileName(`${e.target.files.length} Files`);
  };

  const doReset = () => {
    setInputs({
      files: [],
      category_id: "DEFAULT",
    });
    setStock(0);
    setProductsOption([]);
    setFileName("Choose File");
    setFiles([]);
  };

  const onSubmitHandler = (e) => {
    console.log(inputs);
    //upload stock handler
    e.preventDefault();
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(storeStock(inputs))
          .then((data) => {
            showSuccess(data.msg);
            doReset();
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });

    // e.preventDefault();
    // showConfirm(async function(confirmed) {
    //   if (confirmed) {
    //     setLoading(true);
    //     try {
    //       let { data } = await axios.post(`${ip}/product/storestock`, inputs, {
    //         headers: {
    //           Authorization: "Bearer " + token,
    //           "Content-Type": "multipart/form-data",
    //         },
    //       });
    //       if (data.isSuccess) {
    //         showSuccess(data.msg);
    //         doReset();
    //         // refreshProducts()
    //       } else {
    //         showError(data.msg);
    //       }
    //     } catch (e) {
    //       console.error(e.getMessage);
    //     }
    //     setLoading(false);
    //   }
    // });
  };

  const getProductsByCategory = async (category_id) => {
    dispatch(getProductOptionsByCategory(category_id))
      .then((data) => {
        setProductsOption(data);
        setStock(0);
      })
      .catch(({ data }) => {
        showError(data.msg);
      });
  };

  //   useEffect(() => {
  //     if (!flgAutoStock) {
  //       showError(
  //         "Menu ini hanya digunakan jika produk menggunakan setting auto stock!"
  //       );
  //       history.push("/home");
  //     }
  //   }, []);

  useEffect(() => {
    dispatch(getCategoryOptions())
      .then((data) => {
        setCategoriesOption(data);
      })
      .catch(({ data }) => {
        showError(data.msg);
      });
  }, []);

  return (
    <div className="content-wrapper">
      <ContentHeader title="Upload Stock" parentTitle="Stock" />
      <section className="content">
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Stock</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="card-body">
              {getProductLoading ? (
                <Spinner></Spinner>
              ) : (
                <>
                  <div className="row">
                    <div className="form-group col-3">
                      <SelectBox
                        id="category_id"
                        options={categoriesOption}
                        defaultValue={inputs.category_id}
                        label="Category"
                        loading={getCategoriesLoading}
                        onChange={(e) => onChangeCategory(e)}
                      />
                    </div>
                    <div className="form-group col-5">
                      <SelectBox
                        id="product_id"
                        options={productsOption}
                        defaultValue={inputs.product_id}
                        label="Product"
                        loading={getProductsLoading}
                        onChange={(e) => onChangeProduct(e)}
                      />
                      {/* <select
                        onChange={(e) => onChangeProduct(e)}
                        className="form-control form-control-sm "
                        id="product_id"
                        name="product_id"
                        placeholder="Product"
                        value={productsOption.product_id}
                      >
                        <option value="DEFAULT">-- Select Product --</option>
                        {productsOption.map((product) => (
                          <option
                            key={product.product_id}
                            value={product.product_id}
                            stock={product.stock}
                          >{`${product.product_id} - ${product.product_name}`}</option>
                        ))}
                      </select> */}
                    </div>
                    <div className="form-group col-2">
                      <small>Current Stock</small>
                      <input
                        type="stock"
                        value={stock}
                        className="form-control form-control-sm "
                        id="stock"
                        placeholder="Current Stock"
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12">
                      <input
                        type="file"
                        onChange={(e) => onChangeFile(e)}
                        className="custom-file-input"
                        id="files[]"
                        name="files[]"
                        multiple={true}
                      />
                      <label className="custom-file-label" id="fileName">
                        {fileName}
                      </label>
                    </div>
                  </div>
                  <div className="row mt-4">
                    {Array.from(files).map((file, index) => (
                      <div className="col-1 text-center" key={index}>
                        <div className="row">
                          <div className="col text-center">
                            <p
                              width="200px"
                              height="200px"
                              className="fas fa-file-archive fa-2x"
                            />
                            <p>{file.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
