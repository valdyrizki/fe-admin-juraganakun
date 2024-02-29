import React, { useEffect, useState } from "react";
import ContentHeader from "../../Component/ContentHeader";
import { useDispatch, useSelector } from "react-redux";
import { generateImage, getReplicateById } from "../../actions/replicateAction";
import { showError } from "../../Component/Template/Msg";
import Spinner from "../loading";

function GenerateImage(props) {
  const dispatch = useDispatch();
  const [output, setOutput] = useState("");
  const [searchBox, setSearchBox] = useState("");
  const [replicate, setReplicate] = useState(false);
  const [countReq, setCountReq] = useState(0);

  const onOk = (e) => {
    if (e.key === "Enter") {
      console.log(searchBox);
      setOutput("LOADING");
      dispatch(generateImage(searchBox))
        .then((data) => {
          setReplicate(data);
          getImage(data);
        })
        .catch(({ data }) => {
          showError(data.msg);
        });
    }
  };

  const getImage = async (param) => {
    console.log("getting Image ...");
    await setTimeout(async () => {
      // Panggil aksi setelah penundaan 2 detik
      await dispatch(getReplicateById(param.data.id))
        .then(async (response) => {
          setReplicate(response);
          if (response.data.status === "failed") {
            console.log(response);
            showError(response.data.error);
            setOutput("");
          } else if (response.data.status !== "succeeded") {
            if (countReq < 10) {
              setCountReq(countReq + 1);
              await getImage(response);
            } else {
              showError("Connection Timeout, pls try again!");
              setOutput("");
            }
          } else {
            let arrayOutput = JSON.parse(response.data.output);
            setOutput(arrayOutput[0]);
          }
        })
        .catch(({ data }) => {
          showError(data.msg);
        });
    }, 5000);
  };

  const { getReplicateLoading } = useSelector(
    (state) => state.ReplicateReducer
  );

  return (
    <div className="content-wrapper">
      <ContentHeader title="Generate Image By AI" parentTitle="AI" />

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Generate Image</h3>
          </div>

          <div className="card">
            <div className="card-header"></div>

            <div className="card-body">
              <div className="row">
                <input
                  type="text"
                  value={searchBox}
                  onKeyDown={(e) => onOk(e)}
                  onChange={(e) => setSearchBox(e.target.value)}
                  name="searchBox"
                  className="form-control"
                  placeholder="Input Prompt"
                />
              </div>

              <div className="row pt-2">
                <div className="col-md-4">
                  <p>
                    Status : <b>{replicate ? replicate.data.status : "Idle"}</b>
                  </p>
                </div>
              </div>

              <div className="row pt-4">
                {getReplicateLoading || output === "LOADING" ? (
                  <div className="col-12">
                    <Spinner />
                  </div>
                ) : (
                  <img
                    src={output}
                    className="img-responsive text-center"
                    width={500}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GenerateImage;
