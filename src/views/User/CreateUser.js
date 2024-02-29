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
import { createUser } from "../../actions/userAction";
import Spinner from "../loading";
import { getRoles } from "../../actions/roleAction";

function CreateUser(props) {
  //dispatcer & state metode hook
  const history = useHistory();
  const dispatch = useDispatch();

  const [formUser, setFormUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    status: "1",
    level: "00",
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(createUser(formUser))
          .then(({ msg }) => {
            showSuccess(msg);
            history.push("/user");
          })
          .catch(({ data }) => {
            console.error(data);
            showError(data.msg);
          });
      }
    });
  };

  const { getRolesError, getRolesLoading, getRolesResult } = useSelector(
    (state) => state.RoleReducer
  );

  const { getUserLoading } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    dispatch(getRoles());
  }, []);

  return (
    <div className="content-wrapper">
      <ContentHeader title="Create User" parentTitle="User" />
      <section className="content">
        <NavLink to="/user/" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form User</h3>
          </div>
          <form onSubmit={onSubmitHandler}>
            {getUserLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-3">
                      <small>Email</small>
                      <input
                        type="email"
                        className="form-control form-control-sm "
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formUser.email}
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-3">
                      <small>Username</small>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formUser.username}
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-3">
                      <small>Firstname</small>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="firstname"
                        name="firstname"
                        placeholder="First Name"
                        value={formUser.firstname}
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-3">
                      <small>Lastname</small>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="lastname"
                        name="lastname"
                        placeholder="Last Name"
                        value={formUser.lastname}
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-3">
                      <small>Phone Number</small>
                      <input
                        type="text"
                        className="form-control form-control-sm "
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={formUser.phone}
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-3">
                      <small>Status</small>
                      <select
                        className="form-control form-control-sm "
                        id="status"
                        name="status"
                        placeholder="Status User"
                        value={formUser.status}
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option defaultChecked={true} value={1}>
                          Aktif
                        </option>
                        <option value={0}>Belum Aktif</option>
                        <option value={9}>Nonaktif</option>
                      </select>
                    </div>

                    <div className="form-group col-3">
                      <small>Level</small>
                      {getRolesLoading ? (
                        <Spinner />
                      ) : (
                        <select
                          className="form-control form-control-sm "
                          id="level"
                          name="level"
                          placeholder="Level User"
                          value={formUser.level}
                          onChange={(e) =>
                            setFormUser({
                              ...formUser,
                              [e.target.name]: e.target.value,
                            })
                          }
                        >
                          {getRolesResult ? (
                            getRolesResult.length < 1 ? (
                              <option disabled={true}>No Data</option>
                            ) : (
                              getRolesResult.map((role, index) => (
                                <option key={role.id} value={role.id}>
                                  {role.id + " - " + role.role_name}
                                </option>
                              ))
                            )
                          ) : getRolesError ? (
                            <option disabled={true}>Error</option>
                          ) : (
                            <option disabled={true}>
                              Error When Parsing Data
                            </option>
                          )}
                        </select>
                      )}
                    </div>

                    <div className="form-group col-3">
                      <small>Password</small>
                      <input
                        type="password"
                        className="form-control form-control-sm "
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formUser.password}
                        onChange={(e) =>
                          setFormUser({
                            ...formUser,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
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

export default CreateUser;
