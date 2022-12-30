import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import ContentHeader from '../../Component/ContentHeader';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';
import { getStsFileProduct } from '../../Component/Helpers';
import { NavLink } from 'react-router-dom';

function FileManager(props) {
  const [files,setFiles] = useState([])
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)
  const [filteredFiles,setFilteredFiles] = useState(files)
  const [searchBox,setSearchBox] = useState('')
  const [loading,setLoading] = useState(false)

  const getFiles = async() =>{
    let obj = []
    setLoading(true)
    try{
        let {data} = await axios.get(`${ip}/file`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        obj = data.data
        setFiles(obj)
        setLoading(false)
    }catch(e){
        console.error(e.message);
        setLoading(false)
    } 
  }

  useEffect(() => {
    getFiles()
}, []);

useEffect(() => {
    if (searchBox === '') {
        setFilteredFiles(files)
    }else{
        setFilteredFiles(
            files.filter((file) => 
                String(file.invoice_id).indexOf(searchBox.toUpperCase()) !== -1 || 
                String(file.filename.toUpperCase()).indexOf(searchBox.toUpperCase()) !== -1 ||
                String(getStsFileProduct(file.status)).indexOf(searchBox.toUpperCase()) !== -1 
        ))
    }
    
}, [files,searchBox]);

    return (
        <div className="content-wrapper">
          <ContentHeader title="List Product File" parentTitle="File Manager"/> 
            <section className="content">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">File Manager</h3>
                </div>
                <div className="card">
                    <div className="card-header">
                        <input type="text" value={searchBox} onChange={(e) => setSearchBox(e.target.value)} name='searchBox' className="form-control" placeholder="Search" />
                    </div>
                    <div className="card-body">
                      
                      <Suspense fallback={"<div> Loading ...<div/>"}>
                        {loading ? <div> Loading .... </div> :
                          <table id="tableTransactions" className="table table-striped table-sm">
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
                              {filteredFiles.map((file,index) => (
                                <tr key={file.id}>
                                  <td>{index+1}</td>
                                  <td><NavLink to={`/transaction/detail/${file.invoice_id}`}>{file.invoice_id}</NavLink></td>
                                  <td>{file.product_id}</td>
                                  <td>{file.filename}</td>
                                  <td>{file.path}</td>
                                  <td>{getStsFileProduct(file.status)}</td>
                                </tr>
                              ))}
                              
                              </tbody>
                              
                          </table>
                        }
                        </Suspense>
                    </div>
                </div>
              </div>

            </section>
          </div>
    );
}

export default FileManager;