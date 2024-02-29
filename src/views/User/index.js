import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { getStsUser } from "../../Component/Helpers";
import { deleteUser, getUsers } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../loading";

function User(props) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchBox, setSearchBox] = useState("");
  const dispatch = useDispatch();

  const onDeleteHandler = (user_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(deleteUser(user_id))
          .then(({ msg }) => {
            showSuccess(msg);
            getListUsers();
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };

  const { getUsersLoading, getUserLoading } = useSelector(
    (state) => state.UserReducer
  );

  const getListUsers = () => {
    dispatch(getUsers())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.error(err);
        showError(err.message);
      });
  };

  useEffect(() => {
    getListUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toUpperCase().indexOf(searchBox.toUpperCase()) !== -1
      )
    );
  }, [users, searchBox]);

  return (
    <div className="content-wrapper">
      <ContentHeader title="List Users" parentTitle="Users" />

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">List Users</h3>
          </div>

          <div className="card">
            <div className="card-header">
              <NavLink to="/user/create" className="btn bg-primary">
                <i className="fas fa-plus"></i> Add User
              </NavLink>
              <div className="float-right">
                <input
                  type="text"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                  name="searchBox"
                  className="form-control"
                  placeholder="Search User"
                />
              </div>
            </div>

            <div className="card-body">
              <table id="tableUser" className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getUsersLoading || getUserLoading ? (
                    <tr className="hover:bg-gray-50">
                      <td colSpan={7}>
                        <Spinner />
                      </td>
                    </tr>
                  ) : filteredUsers ? (
                    filteredUsers.length < 1 ? (
                      <tr className="hover:bg-gray-50">
                        <td colSpan={6}>
                          <p>No Data</p>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{`${user.firstname} ${user.lastname}`}</td>
                          <td>{user.phone}</td>
                          <td>{getStsUser(user.status)}</td>
                          <td>{user.role_name}</td>
                          <td>
                            <NavLink
                              to={`/user/edit/${user.id}`}
                              className="btn bg-primary btn-xs mr-2"
                            >
                              <i className="fas fa-edit"></i> Edit
                            </NavLink>
                            <button
                              onClick={() => onDeleteHandler(user.id)}
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

export default User;
