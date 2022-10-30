import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentHeader from '../../Component/ContentHeader';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';
import {decimalFormatter2 } from '../../Component/Helpers';

function Report(props) {
  const [banks,setBanks] = useState([])
  const [loading,setLoading] = useState(false)
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)

  const getBanks = async ()=>{
    setLoading(true)
    try{
        let {data} = await axios.get(`${ip}/bank`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        setBanks(data.data)
        setLoading(false)
    }catch(e){
        console.log(e.message);
        setLoading(false)
    }
  }
  
 

    useEffect( () =>{
        getBanks(); 
    },[]) 

    return (
        <div className="content-wrapper">
            <ContentHeader title="Reports" parentTitle="Journal Category"/> 

            <section className="content">

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Bank Balance</h3>
                    </div>
                    
                    <div className="card">                        
                        <div className="card-body">
                            {
                                loading ? <div> Loading .... </div> :
                                <div className="row">
                                    {/* <div className="col-lg-3 col-12">
                                        <div className="small-box bg-primary">
                                            <a href="/#" className="small-box-footer">BCA</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-warning">
                                            <a href="/#" className="small-box-footer">Mandiri</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-teal">
                                            <a href="/#" className="small-box-footer">P-Store</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-primary">
                                            <a href="/#" className="small-box-footer">BRI</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-cyan">
                                            <a href="/#" className="small-box-footer">JENIUS</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-indigo">
                                            <a href="/#" className="small-box-footer">PAYPAL</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-info">
                                            <a href="/#" className="small-box-footer">DANA</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-purple">
                                            <a href="/#" className="small-box-footer">OVO</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-success">
                                            <a href="/#" className="small-box-footer">GOPAY</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div> */}
                                    {banks.map((bank) =>(
                                        <div className="col-lg-3 col-12">
                                            <div className="small-box bg-success">
                                                <a href="/#" className="small-box-footer">{bank.name}</a>
                                                <div className="inner">
                                                    <h4><sup style={{fontSize: '14px'}}>Rp</sup>{decimalFormatter2(bank.balance)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                    <h4 className="card-title">Report Transaction</h4>
                    </div>
                    
                    {/* <div className="card">
                        <div className="card-header">
                            <ul className="pagination pagination-month justify-content-center">
                                <li className="page-item"><a className="page-link" href="#">«</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Jan</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Feb</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Mar</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Apr</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">May</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Jun</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Jul</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Aug</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Sep</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Oct</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Nov</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <p className="page-month">Dec</p>
                                        <p className="page-year">2021</p>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">»</a></li>
                            </ul>
                        </div>
                        
                        <div className="card-body">
                            {
                                // loading ? <div> Loading .... </div> :
                                <div className="row">
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-primary">
                                            <a href="/#" className="small-box-footer">BCA</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-warning">
                                            <a href="/#" className="small-box-footer">Mandiri</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-teal">
                                            <a href="/#" className="small-box-footer">P-Store</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-primary">
                                            <a href="/#" className="small-box-footer">BRI</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-cyan">
                                            <a href="/#" className="small-box-footer">JENIUS</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-indigo">
                                            <a href="/#" className="small-box-footer">PAYPAL</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-info">
                                            <a href="/#" className="small-box-footer">DANA</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-purple">
                                            <a href="/#" className="small-box-footer">OVO</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="small-box bg-success">
                                            <a href="/#" className="small-box-footer">GOPAY</a>
                                            <div className="inner">
                                                <h4><sup style={{fontSize: '14px'}}>Rp</sup>100.000.000</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            </div>
                    </div> */}
                </div>

            </section>
        </div>
    );
}

export default Report;