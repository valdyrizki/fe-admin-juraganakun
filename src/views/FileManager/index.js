import React, { Suspense, useEffect, useState } from "react";
import ContentHeader from "../../Component/ContentHeader";
import { getStsFileProduct } from "../../Component/Helpers";
import { NavLink } from "react-router-dom";
import {
  getFiles,
  getFilesByFileName,
  getFilesByInvoice,
  getFilesByRecord,
} from "../../actions/fileAction";
import { useDispatch, useSelector } from "react-redux";
import { showError } from "../../Component/Template/Msg";
import Spinner from "../loading";

function FileManager(props) {
  const [files, setFiles] = useState([]);
  const [searchBoxInvoice, setSearchBoxInvoice] = useState(null);
  const [searchBoxFileName, setSearchBoxFileName] = useState(null);
  const dispatch = useDispatch();

  const { getFilesLoading } = useSelector((state) => state.FileReducer);

  const getListFiles = () => {
    dispatch(getFilesByRecord(10))
      .then((data) => {
        setFiles(data.data);
      })
      .catch((err) => {
        console.error(err);
        showError(err.message);
      });
  };

  useEffect(() => {
    getListFiles();
  }, []);

  //debounce search invoice
  useEffect(() => {
    if (searchBoxInvoice !== null) {
      if (searchBoxInvoice !== "") {
        const timeOutId = setTimeout(() => {
          dispatch(getFilesByInvoice(searchBoxInvoice))
            .then((data) => {
              setFiles(data.data);
            })
            .catch((err) => {
              console.error(err);
              showError(err.message);
            });
        }, 1000);
        return () => clearTimeout(timeOutId);
      } else {
        getListFiles();
      }
    }
  }, [searchBoxInvoice]);

  //debounce search filename
  useEffect(() => {
    if (searchBoxFileName !== null) {
      if (searchBoxFileName !== "") {
        const timeOutId = setTimeout(() => {
          dispatch(getFilesByFileName(searchBoxFileName))
            .then((data) => {
              setFiles(data.data);
            })
            .catch((err) => {
              console.error(err);
              showError(err.message);
            });
        }, 1000);
        return () => clearTimeout(timeOutId);
      } else {
        getListFiles();
      }
    }
  }, [searchBoxFileName]);

  // useEffect(() => {
  //   if (searchBox === "") {
  //     setFilteredFiles(files);
  //   } else {
  //     setFilteredFiles(
  //       files.filter(
  //         (file) =>
  //           String(file.invoice_id).indexOf(searchBox.toUpperCase()) !== -1 ||
  //           String(file.filename.toUpperCase()).indexOf(
  //             searchBox.toUpperCase()
  //           ) !== -1 ||
  //           String(getStsFileProduct(file.status)).indexOf(
  //             searchBox.toUpperCase()
  //           ) !== -1
  //       )
  //     );
  //   }
  // }, [files, searchBox]);

  return (
    <div className="content-wrapper">
      <ContentHeader title="List Product File" parentTitle="File Manager" />
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">File Manager</h3>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-6 form-group">
                  <input
                    type="text"
                    value={searchBoxInvoice}
                    onChange={(e) => {
                      setSearchBoxInvoice(e.target.value);
                    }}
                    name="searchBox"
                    className="form-control"
                    placeholder="Search By invoice"
                  />
                </div>
                <div className="col-6 form-group">
                  <input
                    type="text"
                    value={searchBoxFileName}
                    onChange={(e) => {
                      setSearchBoxFileName(e.target.value);
                    }}
                    name="searchBox"
                    className="form-control"
                    placeholder="Search By FileName"
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              {getFilesLoading ? (
                <Spinner />
              ) : (
                <table
                  id="tableTransactions"
                  className="table table-striped table-sm"
                >
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Invoice</th>
                      <th>Product ID</th>
                      <th>File Name</th>
                      <th>Path</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr key={file.id}>
                        <td>{index + 1}</td>
                        <td>
                          <NavLink
                            to={`/transaction/detail/${file.invoice_id}`}
                          >
                            {file.invoice_id}
                          </NavLink>
                        </td>
                        <td>{file.product_id}</td>
                        <td>{file.filename}</td>
                        <td>{file.path}</td>
                        <td>{getStsFileProduct(file.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FileManager;
