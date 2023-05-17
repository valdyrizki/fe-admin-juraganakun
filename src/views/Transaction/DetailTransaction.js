import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useRecoilValue } from "recoil";
import ContentHeader from "../../Component/ContentHeader";
import {
  decimalFormatter,
  downloadFile,
  getFormatDate,
} from "../../Component/Helpers";
import {
  showConfirm,
  showError,
  showFlashMsg,
  showSuccess,
} from "../../Component/Template/Msg";
import { serverIp } from "../../store/setting";
import { tokenAtom } from "../../store/user";

function DetailTransaction(props) {
  const { invoice_id } = useParams();
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("Choose File");
  const [comment, setComment] = useState({
    invoice_id: invoice_id,
  });
  const [comments, setComments] = useState([]);
  const [productFiles, setProductFiles] = useState([]);
  const [transaction, setTransaction] = useState({});
  const [bank, setBank] = useState({});
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [clipboard] = useState(
    `INVOICE : #${invoice_id}
Terimakasih sudah order di www.juraganakun.com, ditunggu orderan selanjutnya yaaa 😁
untuk tips iklan, perawatan dan jika ada kendala, bisa hubungi tim support kami. Untuk pembelian lebih cepat bisa dilakukan di website yaa`
  );
  const token = useRecoilValue(tokenAtom);
  const ip = useRecoilValue(serverIp);
  const current = new Date();

  const onChangeFile = (e) => {
    setComment({ ...comment, "files[]": e.target.files });
    setFiles(e.target.files);
    setFileName(`${e.target.files.length} Files`);
  };

  const getTransaction = async () => {
    let obj = [];
    setLoading(true);
    try {
      let { data } = await axios.get(`${ip}/transaction/getbyinvoice`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          invoice_id: invoice_id,
        },
      });
      obj = data.data;
      setTransaction(obj);
      setTransactionDetails(obj.transaction_details);
      setProductFiles(obj.product_files);
      setComments(obj.comments);
      setLoading(false);
      setBank(obj.bank);
    } catch (e) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const getComments = async () => {
    setLoadingComment(true);
    try {
      let { data } = await axios.get(`${ip}/comment/getbyinvoice`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          invoice_id: invoice_id,
        },
      });
      setComments(data.data);
      setLoadingComment(false);
    } catch (e) {
      console.log(e.message);
      setLoadingComment(false);
    }
  };

  const onSubmitComment = (e) => {
    //submit comment
    e.preventDefault();

    console.log(comment);
    showConfirm(async function(confirmed) {
      if (confirmed) {
        try {
          setLoadingComment(true);
          let { data } = await axios.post(`${ip}/comment/store`, comment, {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "multipart/form-data",
            },
          });
          if (data.isSuccess) {
            showSuccess(data.msg);
          } else {
            console.error(data.data);
            showError(data.msg);
          }
          getComments();
          setComment("");
          setFiles([]);
          setFileName("Choose File");
        } catch (e) {
          console.log(e.getMessage);
        }
      }
    });
  };

  const downloadFileProduct = async (product_file) => {
    try {
      let response = await axios.post(
        `${ip}/product/downloadbycode`,
        { code: product_file.code },
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      downloadFile(response, product_file.filename);
    } catch (e) {
      console.log(e.getMessage);
    }
  };

  const downloadFileComment = async (comment_file) => {
    setLoading(true);
    try {
      let response = await axios.post(
        `${ip}/comment/downloadbycode`,
        { code: comment_file.code },
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      downloadFile(response, comment_file.filename);
    } catch (e) {
      console.log(e.getMessage);
    }
    setLoading(false);
  };

  const deleteComment = async (comment) => {
    showConfirm(async function(confirmed) {
      if (confirmed) {
        setLoading(true);
        try {
          let { data } = await axios.put(
            `${ip}/comment/delete`,
            { id: comment.id },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          if (data.isSuccess) {
            showSuccess(data.msg);
            getComments();
          } else {
            console.error(data.data);
            showError(data.msg);
          }
        } catch (e) {
          console.log(e.message);
        }
        setLoading(false);
      }
    });
  };

  const downloadAllFile = async () => {
    setLoading(true);
    try {
      let response = await axios.post(
        `${ip}/product/downloadbyinvoice`,
        { invoice_id: invoice_id },
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      downloadFile(response, `${invoice_id}.zip`);
    } catch (e) {
      console.log(e.getMessage);
    }
    setLoading(false);
  };

  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
    showFlashMsg("Copy Success");
  }

  useEffect((e) => {
    getTransaction();
  }, []);

  return (
    <div className="content-wrapper">
      <ContentHeader title="Detail Transaction" parentTitle="Transaction" />
      <section className="content">
        <NavLink to="/transaction" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        {loading ? (
          <div> Loading .... </div>
        ) : (
          <>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="invoice p-3 mb-3">
                    <div className="row">
                      <div className="col-12">
                        <h4>
                          <i className="fas fa-globe"></i> JURAGANAKUN.COM
                          <small className="float-right">
                            Date: {getFormatDate(current)}
                          </small>
                        </h4>
                      </div>
                    </div>
                    <div className="row invoice-info">
                      <div className="col-sm-4 invoice-col">
                        From
                        <address>
                          <strong>Juragan Akun</strong>
                          <br />
                          Phone: +6283818213645
                          <br />
                          Email: admin@juraganakun.com
                        </address>
                      </div>
                      <div className="col-sm-4 invoice-col">
                        To
                        <address>
                          <strong>{transaction.client_name}</strong>
                          <br />
                          Phone: {transaction.phone_number}
                          <br />
                          Email: {transaction.email}
                        </address>
                      </div>
                      <div className="col-sm-4 invoice-col">
                        <b>Invoice #{invoice_id}</b>
                        <br />
                        <b>Payment Due:</b> - <br />
                        <b>Bank Transfer:</b> {bank.name} : {bank.accnbr} <br />
                        <b>Transaction Date:</b> {transaction.created_at} <br />
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
                              <th>Description</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>

                          <tbody>
                            {transactionDetails.map((map) => (
                              <tr key={map.id}>
                                <td>{map.qty}</td>
                                <td>{map.product.product_name}</td>
                                <td>
                                  Rp. {decimalFormatter(map.product.price)}
                                </td>
                                <td>{map.description}</td>
                                <td>
                                  Rp.{" "}
                                  {decimalFormatter(
                                    map.qty * map.product.price
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan={4} className="text-right">
                                Total
                              </td>
                              <td>
                                Rp.{" "}
                                {decimalFormatter(
                                  parseInt(transaction.total_price)
                                )}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>

                    <div className="row no-print">
                      <div className="col-12">
                        <p
                          href="invoice-print.html"
                          rel="noopener"
                          target="_blank"
                          className="btn btn-default mr-1"
                        >
                          <i className="fas fa-print"></i> Print
                        </p>
                        <p
                          href="invoice-print.html"
                          rel="noopener"
                          target="_blank"
                          className="btn btn-success"
                          onClick={() => unsecuredCopyToClipboard(clipboard)}
                        >
                          <i className="fas fa-copy"></i> Copy
                        </p>

                        <button
                          type="button"
                          className="btn btn-primary float-right mr-2"
                          onClick={downloadAllFile}
                        >
                          <i className="fas fa-download"></i> DOWNLOAD FILE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Detail Transaction</h3>

                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    title="Collapse"
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="remove"
                    title="Remove"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
                    <div className="row">
                      <div className="col-12">
                        {loadingComment ? (
                          <div> Loading .... </div>
                        ) : (
                          <>
                            <h4>Komentar</h4>
                            {comments.map((comment) => (
                              <div className="post" key={comment.id}>
                                <div className="user-block">
                                  <img
                                    className="img-circle img-bordered-sm"
                                    src="../../dist/img/user1-128x128.jpg"
                                    alt="user"
                                  />
                                  <span className="username">
                                    <p>{comment.user.name}</p>
                                  </span>
                                  <span className="description">
                                    Shared publicly - {comment.created_at}
                                  </span>
                                </div>
                                <p>{comment.comment}</p>

                                <div className="row">
                                  {comment.comment_files.map((files) => (
                                    <p
                                      className="btn btn-dark btn-xs mr-1"
                                      key={files.id}
                                      onClick={(e) =>
                                        downloadFileComment(files)
                                      }
                                    >
                                      <i className="fas fa-link mr-1"></i>
                                      {files.filename}
                                    </p>
                                  ))}
                                </div>
                                <span>
                                  <p
                                    className="btn btn-danger btn-xs"
                                    onClick={() => deleteComment(comment)}
                                  >
                                    <i className="fas fa-trash mr-1"></i> Delete
                                    Comment
                                  </p>
                                </span>
                              </div>
                            ))}

                            <div className="post">
                              <form
                                onSubmit={onSubmitComment}
                                encType="multipart/form-data"
                              >
                                <div className="form-group col-12">
                                  <b>Comment</b>
                                  <textarea
                                    className="form-control form-control-sm"
                                    value={comment.comment}
                                    id="comment"
                                    name="comment"
                                    onChange={(e) =>
                                      setComment({
                                        ...comment,
                                        [e.target.name]: e.target.value,
                                      })
                                    }
                                  />
                                </div>

                                <div className="form-group col-12">
                                  <input
                                    type="file"
                                    onChange={(e) => onChangeFile(e)}
                                    className="custom-file-input"
                                    id="files[]"
                                    name="files[]"
                                    multiple={true}
                                  />
                                  <label
                                    className="custom-file-label"
                                    id="fileName"
                                  >
                                    {fileName}
                                  </label>
                                </div>

                                <div className="row mt-4">
                                  {Array.from(files).map((file, index) => (
                                    <div className="col-12" key={index}>
                                      <p to="/#" className="link-black text-sm">
                                        <i className="fas fa-file-archive mr-1"></i>{" "}
                                        {file.name}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <button
                                  type="submit"
                                  className="btn btn-sm btn-primary col-12"
                                >
                                  Submit Comment
                                </button>
                              </form>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
                    <h3 className="text-primary">#{transaction.invoice_id}</h3>

                    <div className="text-muted">
                      <p className="text-sm">
                        Client Name
                        <b className="d-block">{transaction.client_name}</b>
                      </p>
                      <p className="text-sm">
                        Phone Number
                        <b className="d-block">{transaction.phone_number}</b>
                      </p>
                      <p className="text-sm">
                        Email
                        <b className="d-block">{transaction.email}</b>
                      </p>
                      <p className="text-sm">
                        Description
                        <b className="d-block">{transaction.description}</b>
                      </p>
                    </div>

                    <h5 className="mt-5 text-muted">List File</h5>
                    <ul className="list-unstyled">
                      {productFiles.map((product_file) => (
                        <li key={product_file.id}>
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() => downloadFileProduct(product_file)}
                          >
                            <i className="far fa-fw fa-file-archive"></i>{" "}
                            {product_file.filename}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default DetailTransaction;
