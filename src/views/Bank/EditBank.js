import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import ContentHeader from "../../Component/ContentHeader";
import {
  showConfirm,
  showSuccess,
  showError,
} from "../../Component/Template/Msg";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/user";
import { serverIp } from "../../store/setting";

function CreateBank(props) {
  //dispatcer & state metode hook
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  let { id } = useParams();
  const history = useHistory();
  const token = useRecoilValue(tokenAtom);
  const ip = useRecoilValue(serverIp);

  const onChangeText = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const getBank = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get(`${ip}/bank/getbyid`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          id: id,
        },
      });
      setInputs(data.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  useEffect(() => {
    getBank();
  }, [id]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    showConfirm(async function(confirmed) {
      if (confirmed) {
        setLoading(true);
        try {
          let { data } = await axios.put(`${ip}/bank/update`, inputs, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          if (data.isSuccess) {
            showSuccess(data.msg);
            history.push("/bank");
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

  return (
    <div className="content-wrapper">
      <ContentHeader title="Create Categories" parentTitle="bank" />
      <section className="content">
        <NavLink to="/bank/" className="btn bg-dark mb-2">
          <i className="fas fa-arrow-left"></i> Back
        </NavLink>
        <div className="card card-primary">
          <div className="card-header">
            <h3 className="card-title">Form Bank</h3>
          </div>
          {loading ? (
            <div>Loading . . .</div>
          ) : (
            <form onSubmit={onSubmitHandler}>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-4">
                    <small>Bank Name</small>
                    <input
                      type="text"
                      value={inputs.name}
                      onChange={(e) => onChangeText(e)}
                      className="form-control form-control-sm "
                      id="name"
                      name="name"
                      placeholder="Bank Name"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <small>Account Number</small>
                    <input
                      type="text"
                      value={inputs.accnbr}
                      onChange={(e) => onChangeText(e)}
                      className="form-control form-control-sm "
                      id="accnbr"
                      name="accnbr"
                      placeholder="Account Number"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <small>Status</small>
                    <select
                      onChange={(e) => onChangeText(e)}
                      className="form-control form-control-sm "
                      id="status"
                      name="status"
                      placeholder="Status"
                      value={inputs.status}
                    >
                      <option value="1">Aktif</option>
                      <option value="0">Tidak aktif</option>
                    </select>
                  </div>
                  <div className="form-group col-12">
                    <small>Description</small>
                    <textarea
                      value={inputs.description}
                      onChange={(e) => onChangeText(e)}
                      className="form-control form-control-sm "
                      id="description"
                      name="description"
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default CreateBank;
