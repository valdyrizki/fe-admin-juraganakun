import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
import ContentHeader from '../../Component/ContentHeader';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { NavLink } from 'react-router-dom';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { serverIp } from '../../store/setting';
import { decimalFormatter, getStsTransaction } from '../../Component/Helpers';

function Transaction(props) {
  const [transactions,setTransactions] = useState([])
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)
  const [filterStatus,setFilterStatus] = useState('99')
  const [filteredTransactions,setFilteredTransactions] = useState(transactions)
  const [searchBox,setSearchBox] = useState('')
  const [loading,setLoading] = useState(false)

  const setPending = (invoice_id) =>{
    showConfirm(async function (confirmed) {
        if(confirmed){
            try{
                setLoading(true)
                let {data} = await axios.put(`${ip}/transaction/setpending`,{"invoice_id":invoice_id},
                {
                    headers: {
                        'Authorization': 'Bearer '+token
                    },
                })
                if(data.isSuccess){
                    showSuccess(data.msg)
                }else{
                    showError(data.msg)
                }
                getTransactions()
                setLoading(false)
            }catch(e){
                console.log(e.message);
                setLoading(false)
            }
        }
    });
  }

  const setConfirm = (invoice_id) =>{
    showConfirm(async function (confirmed) {
        if(confirmed){
            try{
                setLoading(true)
                let {data} = await axios.put(`${ip}/transaction/setconfirm`,{"invoice_id":invoice_id},
                {
                    headers: {
                        'Authorization': 'Bearer '+token
                    },
                })
                if(data.isSuccess){
                    showSuccess(data.msg)
                }else{
                    showError(data.msg)
                }
                getTransactions()
                setLoading(false)
            }catch(e){
                console.error(e.message);
                setLoading(false)
            }
        }
    });
  }

  const setRefund = (invoice_id) =>{
    showConfirm(async function (confirmed) {
        if(confirmed){
            try{
                setLoading(true)
                let {data} = await axios.put(`${ip}/transaction/setrefund`,{"invoice_id":invoice_id},
                {
                    headers: {
                        'Authorization': 'Bearer '+token
                    },
                })
                if(data.isSuccess){
                    showSuccess(data.msg)
                }else{
                    showError(data.msg)
                }
                getTransactions()
                setLoading(false)
            }catch(e){
                console.error(e.message);
                setLoading(false)
            }
        }
    });
  }

  const setCancel = (invoice_id) =>{
    showConfirm(async function (confirmed) {
        if(confirmed){
            try{
                setLoading(true)
                let {data} = await axios.put(`${ip}/transaction/setcancel`,{"invoice_id":invoice_id},
                {
                    headers: {
                        'Authorization': 'Bearer '+token
                    },
                })
                if(data.isSuccess){
                    showSuccess(data.msg)
                }else{
                    showError(data.msg)
                }
                getTransactions()
                setLoading(false)
            }catch(e){
                console.error(e.message);
                setLoading(false)
            }
        }
    });
  }

  const getTransactions = async() =>{
    let obj = []
    setLoading(true)
    try{
        let {data} = await axios.get(`${ip}/transaction/get`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        obj = data.data
        setTransactions(obj)
        setLoading(false)
        
    }catch(e){
        console.error(e.message);
        setLoading(false)
    } 
  }

  const onChangeFilter = (e)=>{
    setFilterStatus(e.target.value)
  }

  useEffect(() => {
    getTransactions()
}, []);

useEffect(() => {
    if (filterStatus === '99') {
        setSearchBox('')
        setFilteredTransactions(transactions)
    }else{
        setFilteredTransactions(
            transactions.filter((transaction) => parseInt(transaction.status) === parseInt(filterStatus) && transaction.invoice_id.toUpperCase().indexOf(searchBox.toUpperCase()) !== -1)
        )
    }

}, [transactions,searchBox,filterStatus]);

    return (
        <div className="content-wrapper">
          <ContentHeader title="List Transaction" parentTitle="Transaction"/> 
            <section className="content">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Transaction</h3>
                </div>
                <div className="card">
                    <div className="card-header">
                      <NavLink to="/transaction/create" className="btn bg-primary">
                        <i className="fas fa-plus"></i> Add Transaction
                      </NavLink>
                      <div className='row float-right'>
                        <div className='col-6 form-group justify-content-end'>
                            <select className='form-control' id="filter" name="filter" onChange={(e) => onChangeFilter(e)} value={filterStatus}>
                                <option value='99'>SHOW ALL</option>
                                <option value='0'>PENDING</option>
                                <option value='1'>CONFIRM</option>
                                <option value='2'>REFUND</option>
                                <option value='9'>CANCEL</option>
                            </select>
                        </div>
                        <div className='col-6 form-group justify-content-end'>
                            <input type="text" value={searchBox} onChange={(e) => setSearchBox(e.target.value)} name='searchBox' className="form-control" placeholder="Search invoice" />
                        </div>
                      </div>

                        

                    </div>
                    <div className="card-body">
                      
                      <Suspense fallback={"<div> Loading ...<div/>"}>
                        {loading ? <div> Loading .... </div> :
                          <table id="tableTransactions" className="table table-striped table-sm">
                              <thead>
                                <tr>
                                  <th>No</th>
                                  <th>Invoice</th>
                                  <th>Total Price</th>
                                  <th>Bank</th>
                                  <th>Status</th>
                                  <th>Description</th>
                                  <th>Action</th>
                                  </tr>
                                </thead>
                              <tbody>
                              {filteredTransactions.map((transaction,index) => (
                                <tr key={transaction.invoice_id}>
                                  <td>{index+1}</td>
                                  <td>{transaction.invoice_id}</td>
                                  <td>Rp{decimalFormatter(transaction.total_price)}</td>
                                  <td>{transaction.bank}</td>
                                  <td>{getStsTransaction(transaction.status)}</td>
                                  <td>{transaction.description}</td>
                                  <td>
                                    <NavLink to={`/transaction/detail/${transaction.invoice_id}`} className="btn bg-info btn-xs mr-2">
                                        <i className="fas fa-info-circle"></i> Detail
                                    </NavLink>
                                    <button onClick={() => setPending(transaction.invoice_id)} className="btn bg-primary btn-xs mr-2">
                                        <i className="fas fa-pause-circle"></i> Pending
                                    </button>
                                    <button onClick={() => setConfirm(transaction.invoice_id)} className="btn bg-success btn-xs mr-2">
                                        <i className="fas fa-check-square"></i> Confirm
                                    </button>
                                    <button onClick={() => setRefund(transaction.invoice_id)} className="btn bg-warning btn-xs mr-2">
                                        <i className="fas fa-undo"></i> Refund
                                    </button>
                                    <button onClick={() => setCancel(transaction.invoice_id)} className="btn bg-danger btn-xs">
                                        <i className="fas fa-trash"></i> Cancel
                                    </button>
                                  </td>
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

export default Transaction;