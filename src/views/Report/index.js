import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentHeader from '../../Component/ContentHeader';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';
import {decimalFormatter2, getStsTransaction } from '../../Component/Helpers';
import { showError } from '../../Component/Template/Msg';

function Report(props) {
  const [banks,setBanks] = useState([])
  const [transactions,setTransactions] = useState([])
  const [startDate,setStartDate] = useState()
  const [endDate,setEndDate] = useState()
  const [loading,setLoading] = useState(false)
  const [loadingTrx,setLoadingTrx] = useState(false)
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

  const getTransactionsByRange = async ()=>{
    setLoadingTrx(true)
    try{
        let {data} = await axios.get(`${ip}/transaction/getbyrange`,{
            headers: {
                'Authorization': 'Bearer '+token
            },
            params:{
                startDate : startDate,
                endDate : endDate
            }
        })
        if(data.isSuccess){
            setTransactions(data.data)
        }else{
            showError(data.msg)
            setTransactions([])
        }
        setLoadingTrx(false)
    }catch(e){
        console.log(e.message);
        setLoadingTrx(false)
    }
  }

  const doSearchTrx = ()=>{
    console.log(startDate + ' - ' +endDate);
    if(startDate == null || endDate == null){
        showError('Isi lengkap tgl awal dan akhir')
    }else{
        getTransactionsByRange();
    }
  }
  
 

    useEffect( () =>{
        getBanks(); 
    },[]) 

    return (
        <div className="content-wrapper">
            <ContentHeader title="Reports" parentTitle="Report"/> 

            <section className="content">

                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Bank Balance</h3>
                    </div>
                                       
                    <div className="card-body">
                        {
                            loading ? <div> Loading .... </div> :
                            <div className="row">
                                {banks.map((bank) =>(
                                    <div className="col-lg-3 col-12" key={bank.id} >
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

                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Report Transaction</h4><br />
                        <div className='row'>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="far fa-calendar-alt"></i>
                                    </span>
                                    <input type="date" className="form-control float-right" id="datepicker" onChange={(e)=> setStartDate(e.target.value)}  />
                                </div>
                            </div>
                            <div className="col-md-1">
                            <h2 className='text-center'> - </h2>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="far fa-calendar-alt"></i>
                                    </span>
                                    <input type="date" className="form-control float-right" id="datepicker" onChange={(e)=> setEndDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <button className="btn btn-primary" onClick={doSearchTrx}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                    <div className="card-body">
                    {loadingTrx ? <div> Loading .... </div> :
                        <table id="tableReportTrx" className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Invoice</th>
                                <th>Total Price</th>
                                <th>Bank</th>
                                <th>Path</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {transactions.map((transaction,index) => (
                            <tr key={transaction.invoice_id}>
                                <td>{index+1}</td>
                                <td>{transaction.invoice_id}</td>
                                <td>{transaction.total_price}</td>
                                <td>{transaction.bank.name}</td>
                                <td>{transaction.client_name}</td>
                                <td>{getStsTransaction(transaction.status)}</td>
                            </tr>
                            ))}
                            
                            </tbody>
                            
                        </table>
                    }
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Report;