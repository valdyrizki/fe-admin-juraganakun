import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import ContentHeader from "../../Component/ContentHeader";
import { NavLink } from "react-router-dom";
import {
  showConfirm,
  showError,
  showSuccess,
} from "../../Component/Template/Msg";
import { decimalFormatter, getStsTransaction } from "../../Component/Helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionsByClientName,
  getTransactionsByInvoice,
  getTransactionsByRecord,
  getTransactionsByStatus,
  setCancelTransaction,
  setConfirmTransaction,
  setPendingTransaction,
  setRefundTransaction,
} from "../../actions/transactionAction";
import Spinner from "../loading";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRecord, setFilterRecord] = useState("10");
  const [searchBoxInvoice, setSearchBoxInvoice] = useState(null);
  const [searchBoxClient, setSearchBoxClient] = useState(null);

  const dispatch = useDispatch();

  const { getTransactionsLoading, getTransactionLoading } = useSelector(
    (state) => state.TransactionReducer
  );

  //AfterGenerate & GetByRecord
  useEffect(() => {
    getListTransaction();
  }, [filterRecord]);

  // getByStatus
  useEffect(() => {
    console.log(filterStatus);
    if (parseInt(filterStatus) === 99) {
      getListTransaction();
    } else if (filterStatus !== "") {
      dispatch(getTransactionsByStatus(filterStatus))
        .then((data) => {
          setTransactions(data.data);
        })
        .catch((err) => {
          showError(err.message);
        });
    }
  }, [filterStatus]);

  const getListTransaction = () => {
    dispatch(getTransactionsByRecord(filterRecord))
      .then((data) => {
        setTransactions(data.data);
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  //debounce search invoice
  useEffect(() => {
    if (searchBoxInvoice !== null) {
      if (searchBoxInvoice !== "") {
        const timeOutId = setTimeout(() => {
          dispatch(getTransactionsByInvoice(searchBoxInvoice))
            .then((data) => {
              setTransactions(data.data);
            })
            .catch((err) => {
              console.error(err);
              showError(err.message);
            });
        }, 1000);
        return () => clearTimeout(timeOutId);
      } else {
        getListTransaction();
      }
    }
  }, [searchBoxInvoice]);

  //debounce search invoice
  useEffect(() => {
    if (searchBoxClient !== null) {
      if (searchBoxClient !== "") {
        const timeOutId = setTimeout(() => {
          dispatch(getTransactionsByClientName(searchBoxClient))
            .then((data) => {
              setTransactions(data.data);
            })
            .catch((err) => {
              console.error(err);
              showError(err.message);
            });
        }, 1000);
        return () => clearTimeout(timeOutId);
      } else {
        getListTransaction();
      }
    }
  }, [searchBoxClient]);

  const setPending = (invoice_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(setPendingTransaction(invoice_id))
          .then(({ msg }) => {
            showSuccess(msg);
            getListTransaction();
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };

  const setConfirm = (invoice_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(setConfirmTransaction(invoice_id))
          .then(({ msg }) => {
            showSuccess(msg);
            getListTransaction();
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };

  const setRefund = (invoice_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(setRefundTransaction(invoice_id))
          .then(({ msg }) => {
            showSuccess(msg);
            getListTransaction();
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };

  const setCancel = (invoice_id) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        dispatch(setCancelTransaction(invoice_id))
          .then(({ msg }) => {
            showSuccess(msg);
            getListTransaction();
          })
          .catch(({ data }) => {
            showError(data.msg);
          });
      }
    });
  };

  return (
    <div className="content-wrapper">
      <ContentHeader title="List Transaction" parentTitle="Transaction" />
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Transaction</h3>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <NavLink to="/transaction/create" className="btn bg-primary">
                  <i className="fas fa-plus"></i> Add Transaction
                </NavLink>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-1 col-sm-4 form-group">
                  <select
                    className="form-control"
                    id="filterRecord"
                    name="filterRecord"
                    onChange={(e) => setFilterRecord(e.target.value)}
                    value={filterRecord}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="999">GET ALL</option>
                  </select>
                </div>
                <div className="col-md-2 col-sm-3 form-group">
                  <select
                    className="form-control"
                    id="filter"
                    name="filter"
                    onChange={(e) => setFilterStatus(e.target.value)}
                    value={filterStatus}
                  >
                    <option value="99">SHOW ALL</option>
                    <option value="0">PENDING</option>
                    <option value="1">DONE</option>
                    <option value="2">REFUND</option>
                    <option value="9">CANCEL</option>
                  </select>
                </div>
                <div className="col-md-4 col-sm-6 form-group">
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
                <div className="col-md-5 col-sm-6 form-group">
                  <input
                    type="text"
                    value={searchBoxClient}
                    onChange={(e) => setSearchBoxClient(e.target.value)}
                    name="searchBox"
                    className="form-control"
                    placeholder="Search By Client Name"
                  />
                </div>
              </div>
              <table
                id="tableTransactions"
                className="table table-striped table-sm"
              >
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Client</th>
                    <th>Total Price</th>
                    <th>Bank</th>
                    <th>Status</th>
                    {/* <th>Description</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getTransactionLoading || getTransactionsLoading ? (
                    <tr className="hover:bg-gray-50">
                      <td colSpan={6}>
                        <Spinner />
                      </td>
                    </tr>
                  ) : transactions ? (
                    transactions.map((transaction) => (
                      <tr key={transaction.invoice_id}>
                        <td>{transaction.invoice_id}</td>
                        <td>{transaction.client_name}</td>
                        <td>Rp{decimalFormatter(transaction.total_price)}</td>
                        <td>
                          {transaction.bank ? transaction.bank.name : "QRIS"}
                        </td>
                        <td>{getStsTransaction(transaction.status)}</td>
                        {/* <td>{transaction.description}</td> */}
                        <td>
                          <NavLink
                            to={`/transaction/detail/${transaction.invoice_id}`}
                            className="btn bg-info btn-xs mr-2"
                          >
                            <i className="fas fa-info-circle"></i> Detail
                          </NavLink>
                          <button
                            onClick={() => setPending(transaction.invoice_id)}
                            className="btn bg-primary btn-xs mr-2"
                          >
                            <i className="fas fa-pause-circle"></i> Pending
                          </button>
                          <button
                            onClick={() => setConfirm(transaction.invoice_id)}
                            className="btn bg-success btn-xs mr-2"
                          >
                            <i className="fas fa-check-square"></i> Confirm
                          </button>
                          <button
                            onClick={() => setRefund(transaction.invoice_id)}
                            className="btn bg-warning btn-xs mr-2"
                          >
                            <i className="fas fa-undo"></i> Refund
                          </button>
                          <button
                            onClick={() => setCancel(transaction.invoice_id)}
                            className="btn bg-danger btn-xs"
                          >
                            <i className="fas fa-trash"></i> Cancel
                          </button>
                        </td>
                      </tr>
                    ))
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

export default Transaction;
