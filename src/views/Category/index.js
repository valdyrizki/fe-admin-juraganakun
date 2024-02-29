import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { getStsGeneral } from "../../Component/Helpers";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../loading";
import { deleteCategory, getCategories } from "../../actions/categoryAction";

function Category(props) {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [searchBox, setSearchBox] = useState("");
  const dispatch = useDispatch();

  const onDeleteHandler = (category_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(deleteCategory(category_id))
          .then(({ msg }) => {
            showSuccess(msg);
            getListCategories();
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };

  const { getCategoriesLoading, getCategoryLoading } = useSelector(
    (state) => state.CategoryReducer
  );

  const getListCategories = () => {
    dispatch(getCategories())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((err) => {
        console.error(err);
        showError(err.message);
      });
  };

  useEffect(() => {
    getListCategories();
  }, []);

  useEffect(() => {
    setFilteredCategories(
      categories.filter(
        (category) =>
          category.category_name
            .toUpperCase()
            .indexOf(searchBox.toUpperCase()) !== -1
      )
    );
  }, [categories, searchBox]);

  return (
    <div className="content-wrapper">
      <ContentHeader title="List Categories" parentTitle="Category" />

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">List Categories</h3>
          </div>

          <div className="card">
            <div className="card-header">
              <NavLink to="/category/create" className="btn bg-primary">
                <i className="fas fa-plus"></i> Add Category
              </NavLink>
              <div className="float-right">
                <input
                  type="text"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                  name="searchBox"
                  className="form-control"
                  placeholder="Search Category"
                />
              </div>
            </div>

            <div className="card-body">
              <table
                id="tableCategory"
                className="table table-striped table-sm"
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Category ID</th>
                    <th>Name</th>
                    <th>Seq</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getCategoriesLoading || getCategoryLoading ? (
                    <tr className="hover:bg-gray-50">
                      <td colSpan={6}>
                        <Spinner />
                      </td>
                    </tr>
                  ) : filteredCategories ? (
                    filteredCategories.length < 1 ? (
                      <tr className="hover:bg-gray-50">
                        <td colSpan={6}>
                          <p>No Data</p>
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((category, index) => (
                        <tr key={category.category_id}>
                          <td>{index + 1}</td>
                          <td>{category.category_id}</td>
                          <td>{category.category_name}</td>
                          <td>{category.seq}</td>
                          <td>{getStsGeneral(category.status)}</td>
                          <td>
                            <NavLink
                              to={`/category/edit/${category.category_id}`}
                              className="btn bg-primary btn-xs mr-2"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </NavLink>
                            <button
                              onClick={() =>
                                onDeleteHandler(category.category_id)
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

export default Category;
