import React, { useState } from "react";
import ContentHeader from "../../Component/ContentHeader";
import JSZip from "jszip";
import InputField from "../../Component/Forms/InputField";

function TextToFile(props) {
  const [ttfData, setTtfData] = useState({
    text: "",
    delimiter: "",
    delimiterName: "", //Delimiter pemisah nama file
    labelName: "",
  });
  const [ttfList, setTtfList] = useState([]);

  const ttfHandler = (e) => {
    e.preventDefault();
    let list = ttfData.text.split(ttfData.delimiter);
    let listData = [];
    list.map((ttf, index) => {
      //Get filename
      let splitData = ttf.split("\n"); //Displit per baris
      let rowName = splitData[0].split(ttfData.delimiterName); //Ambil baris paling atas untuk dijadikan nama
      let filename = `[${ttfData.labelName}] ${rowName[1]}.txt`; //Set nama berdasarkan baris paling atas dipisah dengan {delimiterName}
      console.log(filename);

      const data = {
        index: index,
        data: ttf,
        filename: filename,
      };

      listData.push(data);
    });
    setTtfList(listData);
  };

  const downloadHandler = async (e) => {
    e.preventDefault();
    const zip = new JSZip();

    ttfList.map(async (ttf) => {
      zip.file(ttf.filename, ttf.data);
    });

    zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        // Unduh file ZIP
        const url = window.URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${ttfList.length} Files Compressed.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error("Error compressing files:", error));
  };

  return (
    <div className="content-wrapper">
      <ContentHeader title="Text To File" parentTitle="Tools" />

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Text To File</h3>
          </div>

          <div className="card">
            <div className="card-body">
              <form onSubmit={ttfHandler}>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-4">
                      <small>Text</small>
                      <textarea
                        className="form-control form-control-sm "
                        id="text"
                        name="text"
                        placeholder="Text yang akan di convert"
                        value={ttfData.text}
                        onChange={(e) =>
                          setTtfData({
                            ...ttfData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-2">
                      <small>Delimiter</small>
                      <textarea
                        className="form-control form-control-sm "
                        id="delimiter"
                        name="delimiter"
                        placeholder="Delimiter"
                        value={ttfData.delimiter}
                        onChange={(e) =>
                          setTtfData({
                            ...ttfData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-2">
                      <InputField
                        type="text"
                        id="delimiterName"
                        name="delimiterName"
                        placeholder="Delimiter Name"
                        label="Delimiter Name"
                        onChange={(e) =>
                          setTtfData({
                            ...ttfData,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group col-2">
                      <InputField
                        type="text"
                        id="labelName"
                        name="labelName"
                        placeholder="Label Name"
                        label="Label Name"
                        onChange={(e) =>
                          setTtfData({
                            ...ttfData,
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
              </form>
            </div>
          </div>
        </div>

        {ttfList.length > 0 ? (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Preview : {ttfList.length} Files</h3>
            </div>

            <div className="card">
              <div className="card-body">
                {ttfList.map((ttf, index) => (
                  <div className="row" key={index}>
                    <div className="form-group col-12">
                      <small>{ttf.filename}</small>
                      <textarea
                        className="form-control form-control-sm "
                        id={`text${index}`}
                        name={`text${index}`}
                        placeholder="Text yang akan di convert"
                        value={ttf.data}
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="card-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={downloadHandler}
                >
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}

export default TextToFile;
