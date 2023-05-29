import axios from "axios";
import React from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/user";
import { serverIp } from "../../store/setting";

function CreateCategory(props) {
  //dispatcer & state metode hook
  const [category_id, setCategoryId] = useState("");
  const [category_name, setCategoryName] = useState("");
  const history = useHistory();
  const token = useRecoilValue(tokenAtom);
  const ip = useRecoilValue(serverIp);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    showConfirm(async function(confirmed) {
      if (confirmed) {
        try {
          const category = {
            category_id: category_id,
            category_name: category_name,
          };
          try {
            let { data } = await axios.post(`${ip}/category/getall`, category, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            if (data.isSuccess) {
              showSuccess(data.msg);
              history.push("/category");
            } else {
              console.error(data.data);
              showError(data.msg);
            }
          } catch (e) {
            console.log(e.message);
          }
        } catch (e) {
          console.log(e.getMessage);
        }
      }
    });
  };

  return (
    <div className="content-wrapper">
      <ContentHeader title="Create Categories" parentTitle="Category" />
      <section className="content">
        <NavLink to="/category/" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Category</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            <div className="card-body">
              <div className="row">
                <div className="form-group col-3">
                  <small>Category ID</small>
                  <input
                    type="category_id"
                    value={category_id}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="form-control form-control-sm "
                    id="category_id"
                    placeholder="Category ID"
                  />
                </div>
                <div className="form-group col-9">
                  <small>Category Name</small>
                  <input
                    type="category_name"
                    value={category_name}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="form-control form-control-sm "
                    id="category_name"
                    placeholder="Category Name"
                  />
                </div>
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

export default CreateCategory;
