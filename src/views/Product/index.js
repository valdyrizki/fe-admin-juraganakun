import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import {
  decimalFormatter,
  getBaseUrl,
  getStsGeneral,
  getStsProduct,
} from "../../Component/Helpers";
import Spinner from "../loading";
import ProductService from "../../services/ProductService";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchBox, setSearchBox] = useState("");
  const [productsLoading, setProductsLoading] = useState(false);

  const onDeleteHandler = (product_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        setProductsLoading(true);
        try {
          const { data } = await ProductService.deleteProduct(product_id);
          console.log(data);
          if (data.success) {
            showSuccess(data.message);
            getListProducts();
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
        setProductsLoading(false);
      }
    });
  };

  const getListProducts = async () => {
    //request api
    setProductsLoading(true);
    try {
      const { data } = await ProductService.getAll(); //axios call API
      console.log(data);
      if (data.success) {
        setProducts(data.data);
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
    setProductsLoading(false);
  };

  useEffect(() => {
    getListProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.product_name
            .toUpperCase()
            .indexOf(searchBox.toUpperCase()) !== -1
      )
    );
  }, [products, searchBox]);

  return (
    <div className="content-wrapper">
      <ContentHeader title="List Products" parentTitle="Product" />

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">List Products</h3>
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
                  placeholder="Search Product"
                />
              </div>
            </div>

            <div className="card-body">
              <table id="tableProduct" className="table table-striped table-sm">
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
                  {productsLoading ? (
                    <tr className="hover:bg-gray-50">
                      <td colSpan={9}>
                        <Spinner />
                      </td>
                    </tr>
                  ) : filteredProducts ? (
                    filteredProducts.length < 1 ? (
                      <tr className="hover:bg-gray-50">
                        <td colSpan={9}>
                          <p>No Data</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product, index) => (
                        <tr key={product.product_id}>
                          <td>{index + 1}</td>
                          <td>{product.product_id}</td>
                          <td>{product.product_name}</td>
                          <td>{decimalFormatter(product.cogs)}</td>
                          <td>{decimalFormatter(product.price)}</td>
                          <td>{product.stock}</td>
                          <td>{getStsProduct(product.status)}</td>
                          <td>
                            <img
                              src={getBaseUrl() + product.path}
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
                      ))
                    )
                  ) : (
                    <tr className="hover:bg-gray-50">
                      <td colSpan={6}>
                        <p>Problem when error transaction data</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
