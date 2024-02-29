import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import { decimalFormatter, downloadFile } from "../../Component/Helpers";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryOptions } from "../../actions/categoryAction";
import Spinner from "../loading";
import SelectBox from "../../Component/Selectbox";
import { getProductOptionsByCategory } from "../../actions/productAction";
import { getBankOptions } from "../../actions/bankAction";
import { getPreviewFiles } from "../../actions/fileAction";
import {
  createTransaction,
  getDownloadFileByCode,
} from "../../actions/transactionAction";

function CreateTransaction(props) {
  const dispatch = useDispatch();

  //dispatcer & state metode hook
  const history = useHistory();
  const [order, setOrder] = useState({
    qty: 1,
    price: 0,
  });
  const [banks, setBanks] = useState([]);
  const [stock, setStock] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [carts, setCarts] = useState([]);
  const [productFiles, setProductFiles] = useState([]);
  const [categoryOptions, setCateryOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [inputs, setInputs] = useState({
    product_id: "",
    category_id: "",
    client_name: "",
    phone_number: "",
    email: "viaadm@juraganakun.com",
    bank: 1,
    coupon: "",
    description: "",
    products: [],
  });

  const { getCategoriesLoading } = useSelector(
    (state) => state.CategoryReducer
  );

  const { getProductsLoading } = useSelector((state) => state.ProductReducer);
  const { getBanksLoading } = useSelector((state) => state.BankReducer);
  const { getTransactionLoading } = useSelector(
    (state) => state.TransactionReducer
  );

  const onChangeQty = (e) => {
    let subTotal = order.price * e.target.value;
    setOrder({ ...order, [e.target.name]: e.target.value, subTotal: subTotal });
  };

  const onChangeCategory = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    getProductsByCategory(e.target.value);
  };

  const onChangeProduct = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });

    let selectedIndex = e.target.selectedIndex;
    let selectedLabel = e.target[selectedIndex].text;
    let selectedPrice = e.target[selectedIndex].getAttribute("attrb1"); //price
    let selectedStock = e.target[selectedIndex].getAttribute("attrb2"); //stock
    let subTotal = selectedPrice * order.qty;

    setStock(selectedStock);
    setOrder({
      ...order,
      product_name: selectedLabel,
      price: selectedPrice,
      [e.target.name]: e.target.value,
      subTotal: subTotal,
    });
  };

  const inputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    //upload stock handler
    e.preventDefault();
    inputs.products = carts;
    console.log(inputs);
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(createTransaction(inputs))
          .then((data) => {
            showSuccess(data.msg);
            history.push("/transaction");
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };

  const getBanks = async () => {
    dispatch(getBankOptions())
      .then((data) => {
        setBanks(data);
      })
      .catch(({ data }) => {
        showError(data.msg);
      });

    // setLoading(true);
    // try {getProductByCategory
    //   let { data } = await axios.get(`${ip}/bank/getall`, {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    //   setBanks(data.data);
    // } catch (e) {
    //   console.log(e.message);
    // }
    // setLoading(false);
  };

  const getProductsByCategory = async (category_id) => {
    dispatch(getProductOptionsByCategory(category_id))
      .then((data) => {
        setProductOptions(data);
      })
      .catch(({ data }) => {
        showError(data.msg);
      });
  };

  const addProduct = async () => {
    if (parseInt(order.qty) > parseInt(stock)) {
      showError("Pesanan melampaui stock, stock saat ini : " + stock);
    } else {
      setCarts((current) => [...current, order]);
      setTotalPrice(totalPrice + order.subTotal);

      //get preview file
      dispatch(getPreviewFiles(order.product_id, parseInt(order.qty)))
        .then((data) => {
          // console.log("console.log(data);");
          // console.log(data);
          setProductFiles(productFiles.concat(data.data));
        })
        .catch(({ data }) => {
          showError(data.msg);
        });

      // try {
      //   let { data } = await axios.get(`${ip}/file/getpreviewfile`, {
      //     headers: {
      //       Authorization: "Bearer " + token,
      //     },
      //     params: {
      //       product_id: order.product_id,
      //       qty: parseInt(order.qty),
      //     },
      //   });
      //   setProductFiles(productFiles.concat(data.data));
      // } catch (e) {
      //   console.log(e.message);
      // }
    }
  };

  const downloadFileProduct = async (e, product_file) => {
    e.preventDefault();

    dispatch(getDownloadFileByCode(product_file.code))
      .then((data) => {
        downloadFile(data, product_file.filename);
      })
      .catch((err) => {
        console.error(err);
        showError(err.message);
      });
  };

  useEffect(() => {
    dispatch(getCategoryOptions())
      .then((data) => {
        setCateryOptions(data);
      })
      .catch(({ data }) => {
        showError(data.msg);
      });

    getBanks();
  }, []);

  useEffect(() => {
    console.log(inputs);

    if (inputs.category_id != null) {
      getProductsByCategory(inputs.category_id);
    }
  }, [inputs.category_id]);

  return (
    <div className="content-wrapper">
      <ContentHeader title="Create Transaction" parentTitle="Transaction" />
      <section className="content">
        <NavLink to="/transaction" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Input</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="card-body">
              {getTransactionLoading ? (
                <Spinner />
              ) : (
                <>
                  <div className="row">
                    <div className="form-group col-3">
                      <SelectBox
                        id="category_id"
                        options={categoryOptions}
                        defaultValue={inputs.category_id}
                        label="Category"
                        loading={getCategoriesLoading}
                        onChange={(e) => onChangeCategory(e)}
                      />
                    </div>
                    <div className="form-group col-5">
                      <SelectBox
                        id="product_id"
                        options={productOptions}
                        defaultValue={inputs.product_id}
                        label="Product"
                        loading={getProductsLoading}
                        onChange={(e) => onChangeProduct(e)}
                      />
                    </div>
                    <div className="form-group col-1">
                      <small>Stock</small>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="stock"
                        name="stock"
                        placeholder="stock"
                        maxLength="3"
                        value={stock}
                        disabled
                      />
                    </div>
                    <div className="form-group col-1">
                      <small>Qty</small>
                      <input
                        type="text"
                        onChange={(e) => onChangeQty(e)}
                        className="form-control form-control-sm "
                        id="qty"
                        name="qty"
                        placeholder="qty"
                        maxLength="3"
                        value={order.qty}
                      />
                    </div>
                    <div className="form-group col-2">
                      <p></p>
                      <p
                        className="btn btn-primary btn-sm"
                        onClick={addProduct}
                      >
                        Add Product
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="form-group col-3">
                      <small>Client Name</small>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="client_name"
                        name="client_name"
                        value={inputs.client_name}
                        onChange={(e) => inputChange(e)}
                      />
                    </div>
                    <div className="form-group col-3">
                      <small>Email</small>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        id="email"
                        name="email"
                        value={inputs.email}
                        onChange={(e) => inputChange(e)}
                      />
                    </div>
                    <div className="form-group col-2">
                      <small>Phone</small>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="phone_number"
                        name="phone_number"
                        value={inputs.phone_number}
                        onChange={(e) => inputChange(e)}
                      />
                    </div>
                    <div className="form-group col-2">
                      <SelectBox
                        id="bank"
                        options={banks}
                        defaultValue={inputs.bank}
                        label="Bank Via"
                        loading={getBanksLoading}
                        onChange={(e) =>
                          setInputs({
                            ...inputs,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-2">
                      <small>Coupon</small>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="coupon"
                        name="coupon"
                        value={inputs.coupon}
                        onChange={(e) => inputChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-12">
                      <small>Description</small>
                      <textarea
                        className="form-control form-control-sm"
                        id="description"
                        name="description"
                        value={inputs.description}
                        onChange={(e) => inputChange(e)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Qty</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carts.length < 1 ? (
                            <tr>
                              <td colSpan={4} className="text-center">
                                No data
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {carts.map((cart, index) => (
                            <tr key={index}>
                              <td>{cart.qty}</td>
                              <td>{cart.product_name}</td>
                              <td>{decimalFormatter(cart.price)}</td>
                              <td>{decimalFormatter(cart.subTotal)}</td>
                            </tr>
                          ))}
                          {carts.length > 0 ? (
                            <tr>
                              <td colSpan={3} className="text-center">
                                Total Price
                              </td>
                              <td>Rp {decimalFormatter(totalPrice)}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Filename</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productFiles.length < 1 ? (
                            <tr>
                              <td colSpan={2} className="text-center">
                                No data
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {productFiles.map((product_file, index) => (
                            <tr key={index}>
                              <td>{product_file.product_id}</td>
                              <td>
                                <button
                                  className="btn btn-primary btn-xs"
                                  onClick={(e) =>
                                    downloadFileProduct(e, product_file)
                                  }
                                >
                                  <i className="far fa-fw fa-file-archive"></i>{" "}
                                  {product_file.filename}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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

export default CreateTransaction;
