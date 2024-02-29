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
import { getRoles } from "../../actions/roleAction";
import { createCategory } from "../../actions/categoryAction";

function CreateCategory(props) {
  //dispatcer & state metode hook
  const history = useHistory();
  const dispatch = useDispatch();

  const [formCategory, setFormCategory] = useState({
    category_id: "",
    category_name: "",
    status: "",
    seq: "",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(createCategory(formCategory))
          .then(({ msg }) => {
            showSuccess(msg);
            history.push("/category");
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };
  const { getCategoryLoading } = useSelector((state) => state.CategoryReducer);

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <div className="content-wrapper">
      <ContentHeader title="Create Category" parentTitle="Category" />
      <section className="content">
        <NavLink to="/category" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Category</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            {getCategoryLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-2">
                      <small>Category ID</small>
                      <input
                        type="category_id"
                        className="form-control form-control-sm "
                        id="category_id"
                        name="category_id"
                        placeholder="Category ID"
                        maxLength={2}
                        value={formCategory.category_id}
                        onChange={(e) =>
                          setFormCategory({
                            ...formCategory,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-4">
                      <small>Category Name</small>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="category_name"
                        name="category_name"
                        placeholder="Category Name"
                        maxLength={30}
                        value={formCategory.category_name}
                        onChange={(e) =>
                          setFormCategory({
                            ...formCategory,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-2">
                      <small>Sequence</small>
                      <input
                        type="number"
                        className="form-control form-control-sm "
                        id="seq"
                        name="seq"
                        placeholder="Sequence"
                        maxLength={2}
                        value={formCategory.seq}
                        onChange={(e) =>
                          setFormCategory({
                            ...formCategory,
                            [e.target.name]: e.target.value,
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
                        placeholder="Status Category"
                        value={formCategory.status}
                        onChange={(e) =>
                          setFormCategory({
                            ...formCategory,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option value={1}>Aktif</option>
                        <option value={9}>Nonaktif</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

export default CreateCategory;
