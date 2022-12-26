import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentHeader from '../../Component/ContentHeader';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';
import {decimalFormatter2, getStsDbCr } from '../../Component/Helpers';
import { showError } from '../../Component/Template/Msg';

export default function JournalReport(props) {
  const [banks,setBanks] = useState([])
  const [loading,setLoading] = useState(false)
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)
  //   Jurnal Umum
  const [loadingJU,setloadingJU] = useState(false)
  const [journalTransactionJU,setJournalTransactionJU] = useState([])
  const [startDateJU,setStartDateJU] = useState()
  const [endDateJU,setEndDateJU] = useState()

  // Buku Besar
  const [loadingBB,setLoadingBB] = useState(false)
//   const [journalTransactionBB,setJournalTransactionBB] = useState([])
//   const [startDateBB,setStartDateBB] = useState()
//   const [endDateBB,setEndDateBB] = useState()
  const [journalCategoriesBB,setJournalCategoriesBB] = useState([])
  const [journalAccountsBB,setJournalAccountsBB] = useState([])
  const [journalAccountBB,setJournalAccountBB] = useState()
  const [journalCategoryBB,setJournalCategoryBB] = useState()

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
    setloadingJU(true)
    try{
        let {data} = await axios.get(`${ip}/journal-transaction/getbyrange`,{
            headers: {
                'Authorization': 'Bearer '+token
            },
            params:{
                startDateJU : startDateJU,
                endDateJU : endDateJU
            }
        })

        console.log(data);
        if(data.isSuccess){
            setJournalTransactionJU(data.data)
        }else{
            showError(data.msg)
            setJournalTransactionJU([])
        }
        setloadingJU(false)
    }catch(e){
        console.log(e.message);
        setloadingJU(false)
    }
  }

  const getJournalAccountsByCategory = async (e) => {
    setLoading(true)
    try {
        let {data} = await axios.get(`${ip}/journal-account/getbycategory`,{
            headers: {
                'Authorization': 'Bearer '+token
            },
            params : {
                journal_category_id : e.target.value
            }
        });
        setJournalAccountsBB(data.data);
    } catch (e) {
        console.log(e.message);
    }
    setLoading(false)
  }

  const getJournalCategories = async () => {
    setLoadingBB(true)
    try {
        let {data} = await axios.get(`${ip}/journal-category`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        });
        setJournalCategoriesBB(data.data)
    } catch (e) {
        console.log(e.message);
    }
    setLoadingBB(false)
  }
  

  const doSearchTrx = ()=>{
    console.log(startDateJU + ' - ' +endDateJU);
    if(startDateJU == null || endDateJU == null){
        showError('Isi lengkap tgl awal dan akhir')
    }else{
        getTransactionsByRange();
    }
  }
  
 

    useEffect( () =>{
        getBanks()
        getJournalCategories()
    },[]) 

    return (
        <div className="content-wrapper">
            <ContentHeader title="Journal Reports" parentTitle="Journal"/> 

            <section className="content">

                {/* Jurnal Umum */}
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Jurnal Umum</h4><br />
                        <div className='row'>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="far fa-calendar-alt"></i>
                                    </span>
                                    <input type="date" className="form-control float-right" id="datepicker" onChange={(e)=> setStartDateJU(e.target.value)}  />
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
                                    <input type="date" className="form-control float-right" id="datepicker" onChange={(e)=> setEndDateJU(e.target.value)} />
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
                        {loadingJU ? <div> Loading .... </div> :
                            <table id="tableReportJU" className="table table-striped table-sm">
                                <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Trx ID</th>
                                    <th>Account</th>
                                    <th>DB/CR</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {journalTransactionJU.length <= 0 ? <tr><td colSpan={6} className='text-center'> Tidak Ada data </td></tr> : <></>}
                                    {journalTransactionJU.map((transaction,index) => ( 
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{transaction.txid}</td>
                                            <td>{transaction.journal_account_id +" - "+ transaction.journal_account.name}</td>
                                            <td>{getStsDbCr(transaction.dbcr)}</td>
                                            <td>{decimalFormatter2(transaction.amount)}</td>
                                            <td>{transaction.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>

                {/* Buku Besar */}
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Buku Besar</h4><br />
                        <div className='row'>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-tags"></i>
                                    </span>
                                    <select onChange={(e) => getJournalAccountsByCategory(e)} className="form-control form-control-sm" id="journalCategoryBB" name="journalCategoryBB" placeholder="Category" value={journalCategoryBB}>
                                        <option value="DEFAULT">-- Select Journal Category --</option>
                                        {
                                            journalCategoriesBB.map((journalCategory) => (
                                                <option key={journalCategory.id} value={journalCategory.id}>{`${journalCategory.id} - ${journalCategory.name}`}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <select  className="form-control form-control-sm" id="journalAccountBB" name="journalAccountBB" placeholder="Category" value={journalAccountBB}>
                                        <option value="DEFAULT">-- Select Journal Account --</option>
                                        {
                                            journalAccountsBB.map((journalCategory) => (
                                                <option key={journalCategory.id} value={journalCategory.id}>{`${journalCategory.id} - ${journalCategory.name}`}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="far fa-calendar-alt"> Start Date</i>
                                    </span>
                                    <input type="date" className="form-control float-right form-control-sm" id="datepicker" onChange={(e)=> setStartDateJU(e.target.value)}  />
                                </div>
                            </div>
                            <div className="form-group col-md-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="far fa-calendar-alt"> End Date</i>
                                    </span>
                                    <input type="date" className="form-control float-right form-control-sm" id="datepicker" onChange={(e)=> setEndDateJU(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group col-12">
                                <div className="input-group">
                                    <button className="btn btn-primary" onClick={doSearchTrx}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                     
                    <div className="card-body">
                    {loadingBB ? <div> Loading .... </div> :
                        <table id="tableReportBB" className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Trx ID</th>
                                <th>Account</th>
                                <th>DB/CR</th>
                                <th>Amount</th>
                                <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {journalTransactionJU.length <= 0 ? <tr><td colSpan={6} className='text-center'> Tidak Ada data </td></tr> : <></>}
                                {journalTransactionJU.map((transaction,index) => ( 
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{transaction.txid}</td>
                                        <td>{transaction.journal_account_id +" - "+ transaction.journal_account.name}</td>
                                        <td>{getStsDbCr(transaction.dbcr)}</td>
                                        <td>{decimalFormatter2(transaction.amount)}</td>
                                        <td>{transaction.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    </div>
                </div>

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

            </section>
        </div>
    );
}