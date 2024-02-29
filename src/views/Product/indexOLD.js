import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import ContentHeader from "../../Component/ContentHeader";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/user";
import { NavLink } from "react-router-dom";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { serverIp, serverUrl } from "../../store/setting";
import { decimalFormatter, getStsProduct } from "../../Component/Helpers";

function Product(props) {
  const [products, setProducts] = useState([]);
  const token = useRecoilValue(tokenAtom);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchBox, setSearchBox] = useState("");
  const [loading, setLoading] = useState(false);
  const ip = useRecoilValue(serverIp);
  const url = useRecoilValue(serverUrl);

  const onDeleteHandler = (product_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        try {
          setLoading(true);
          let { data } = await axios.delete(`${ip}/product/destroy`, {
            headers: {
              Authorization: "Bearer " + token,
            },
            data: {
              product_id: product_id,
            },
          });
          if (data.isSuccess) {
            showSuccess(data.msg);
          } else {
            showError(data.msg);
          }
          setLoading(false);
        } catch (e) {
          console.error(e.message);
          setLoading(false);
        }
      }
    });
  };

  const getFilteredProductsProduct = () => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.product_name
            .toUpperCase()
            .indexOf(searchBox.toUpperCase()) !== -1
      )
    );
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      let { data } = await axios.get(`${ip}/product/getall`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProducts(data.data);
      setLoading(false);
    } catch (e) {
      console.error(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getFilteredProductsProduct();
  }, [products, searchBox]);

  return (
    <div className="content-wrapper">
      <ContentHeader title="List Products" parentTitle="Product" />
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Products</h3>
          </div>
          <div className="card">
            <div className="card-header">
              <NavLink to="/product/create" className="btn bg-primary">
                <i className="fas fa-plus"></i> Add Product
              </NavLink>
              <div className="float-right">
                <input
                  type="text"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                  name="searchBox"
                  className="form-control"
                  placeholder="Search product"
                />
              </div>
            </div>
            <div className="card-body">
              <Suspense fallback={"<div> Loading ...<div/>"}>
                {loading ? (
                  <div> Loading .... </div>
                ) : (
                  <table
                    id="tableProducts"
                    className="table table-striped table-sm"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Cogs</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        {/* <th>Description</th> */}
                        <th>Photo</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, index) => (
                        <tr key={product.id}>
                          <td>{index + 1}</td>
                          <td>{product.product_id}</td>
                          <td>{product.product_name}</td>
                          <td>{decimalFormatter(product.cogs)}</td>
                          <td>{decimalFormatter(product.price)}</td>
                          <td>{product.stock}</td>
                          <td>{getStsProduct(product.status)}</td>
                          {/* <td><div dangerouslySetInnerHTML={{ __html: product.description}}></div></td> */}
                          <td>
                            <img
                              src={url + product.path}
                              width="100px"
                              height="100px"
                              alt=""
                            />
                          </td>
                          <td>
                            <NavLink
                              to={`/product/edit/${product.product_id}`}
                              className="btn bg-primary btn-xs mr-2"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </NavLink>
                            <button
                              onClick={() =>
                                onDeleteHandler(product.product_id)
                              }
                              className="btn bg-danger btn-xs"
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
