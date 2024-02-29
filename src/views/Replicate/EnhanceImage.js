import React, { useEffect, useState } from "react";
import ContentHeader from "../../Component/ContentHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  enhanceImage,
  generateImage,
  getReplicateById,
} from "../../actions/replicateAction";
import { showError } from "../../Component/Template/Msg";
import Spinner from "../loading";

function EnhanceImage(props) {
  const dispatch = useDispatch();
  const [output, setOutput] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("Choose Image");
  const [imageBefore, setImageBefore] = useState("");
  const [replicate, setReplicate] = useState(false);
  const [countReq, setCountReq] = useState(0);

  const onChangeFile = (e) => {
    let selectedFile = e.target.files[0];
    setImageName(selectedFile.name);
    setImage(selectedFile);
    // load preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setImageBefore(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  const submitHandler = () => {
    setOutput("LOADING");
    dispatch(enhanceImage(image))
      .then((data) => {
        setReplicate(data);
        if (data.isSuccess) {
          getImage(data);
        } else {
          console.log(data);
          showError(data.msg);
        }
      })
      .catch(({ data }) => {
        showError(data.msg);
      });
  };

  // const onOk = (e) => {
  //   if (e.key === "Enter") {
  //     console.log(searchBox);
  //     setOutput(false);
  //     dispatch(generateImage(searchBox))
  //       .then((data) => {
  //         setReplicate(data);
  //         getImage(data);
  //       })
  //       .catch(({ data }) => {
  //         showError(data.msg);
  //       });
  //   }
  // };

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
            // let arrayOutput = JSON.parse(response.data.output);
            console.log(JSON.parse(response.data.output));
            setOutput(JSON.parse(response.data.output));
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
      <ContentHeader title="Enhance Image By AI" parentTitle="AI" />

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Enhance Image</h3>
          </div>

          <div className="card">
            <div className="card-header"></div>

            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-8 col-sm-12">
                  <input
                    type="file"
                    onChange={(e) => onChangeFile(e)}
                    className="custom-file-input"
                    id="image"
                    name="image"
                  />
                  <label className="custom-file-label" id="fileName">
                    {imageName}
                  </label>
                </div>
                <div className="form-group col-md-4 col-sm-12">
                  <button onClick={submitHandler} className="btn btn-primary">
                    Enhance Image
                  </button>
                </div>
                {/* <input
                  type="text"
                  value={searchBox}
                  onKeyDown={(e) => onOk(e)}
                  onChange={(e) => setSearchBox(e.target.value)}
                  name="searchBox"
                  className="form-control"
                  placeholder="Input Prompt"
                /> */}
              </div>

              <div className="row pt-2">
                <div className="col-md-4">
                  <p>
                    Status : <b>{replicate ? replicate.data.status : "Idle"}</b>
                  </p>
                </div>
              </div>

              {getReplicateLoading || output === "LOADING" ? (
                <div className="row pt-2">
                  <div className="col-12 text-center">
                    <Spinner />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="row pt-2">
                <div className="col-md-6 col-sm-12">
                  <p>Before :</p>
                  <img
                    src={imageBefore}
                    className="img-responsive text-center"
                    width={500}
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <p>After :</p>
                  <img
                    src={output}
                    className="img-responsive text-center"
                    width={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EnhanceImage;
