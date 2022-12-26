import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ContentHeader from '../../Component/ContentHeader';
import { decimalFormatter } from '../../Component/Helpers';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { serverIp } from '../../store/setting';
import { tokenAtom } from '../../store/user';


export default function JournalTransaction(props) {
    //dispatcer & state metode hook
    const token = useRecoilValue(tokenAtom)
    const ip = useRecoilValue(serverIp)
    const [inputs,setInputs] = useState({
        txid : "",
        amount : "0",
        db_journal_category : 'DEFAULT',
        cr_journal_category : 'DEFAULT',
        db_journal_account_id : 'DEFAULT',
        cr_journal_account_id : 'DEFAULT',
        description : ""
    })

    const [txId,setTxId] = useState('')
    const [journalCategories,setJournalCategories] = useState([])
    const [dbJournalAccount,setDbJournalAccount] = useState([])
    const [crJournalAccount,setCrJournalAccount] = useState([])
    const [loading,setLoading] = useState(false)

    const onChangeText = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onChangeDecimal = (e) =>{
        let decimalFormat = decimalFormatter(e.target.value)
        setInputs({ ...inputs, [e.target.name]: decimalFormat });
    }

    const doReset = () =>{
        setInputs({
            txid : "",
            amount : "0",
            db_journal_category : 'DEFAULT',
            cr_journal_category : 'DEFAULT',
            db_journal_account_id : 'DEFAULT',
            cr_journal_account_id : 'DEFAULT',
            description : ""
        })
        
    }

    const getJournalCategories = async () => {
        setLoading(true)
        try {
            let {data} = await axios.get(`${ip}/journal-category`,{
                headers: {
                    'Authorization': 'Bearer '+token
                }
            });
            setJournalCategories(data.data)
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false)
    }

    const getTxId = async () => {
        setLoading(true)
        try {
            let {data} = await axios.get(`${ip}/journal-transaction/gettxid`,{
                headers: {
                    'Authorization': 'Bearer '+token
                }
            });
            setTxId(data);
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false)
    }

    const getJournalAccountsByCategory = async (e,dbcr) => {
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
            if(dbcr === 0){
                setDbJournalAccount(data.data);
            }else{
                setCrJournalAccount(data.data);
            }
            setInputs({ ...inputs, [e.target.name]: e.target.value });
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false)
    }

    const onSubmitHandler = (e) => { //upload stock handler
        e.preventDefault()
        showConfirm(async function (confirmed) {
            if (confirmed) {
                setLoading(true)
                try{
                    //Edit format decimal
                    inputs.amount = inputs.amount.replace(/[,.]/g,'')
                    inputs.txid = txId
                    let {data} = await axios.post(`${ip}/journal-transaction/store`,inputs,
                    {
                        headers: {
                            "Authorization": "Bearer "+token,
                        },
                    });
                    if(data.isSuccess){
                        showSuccess(data.msg)
                        doReset()
                    }else{
                        showError(data.msg)
                    }
                }catch(e){
                    console.error(e.getMessage);
                }
                setLoading(false)
            }
        });
    }

    useEffect(()=>{
        getJournalCategories()
        getTxId()
    },[])

    return (
        <div className="content-wrapper">
            <ContentHeader title="Journal Transaction" parentTitle="Journal"/> 
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Journal Transaction</h3>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="card-body">
                            {loading ? <div>Loading . . .</div> : <>
                                <div className='row'>
                                    <div className="form-group col-3">
                                        <small>Transaction ID</small>
                                        <input type="text" value={txId} name="txid" id="txid" className="form-control form-control-sm " disabled={true}/>
                                    </div>  
                                    <div className="form-group col-3">
                                        <small>Amount</small>
                                        <input type="text" value={inputs.amount} onChange={(e) => onChangeDecimal(e)} name="amount" id="amount" className="form-control form-control-sm "/>
                                    </div>  
                                </div>
                                <div className='row'>
                                    <div className="col-6 text-center">
                                        <h4>DEBIT</h4>
                                    </div>  
                                    <div className="col-6 text-center">
                                        <h4>CREDIT</h4>
                                    </div>  
                                </div>
                                <div className='row'>
                                    <div className="form-group col-3">
                                        <small>Category Account</small>
                                        <select onChange={(e) => getJournalAccountsByCategory(e,0)} className="form-control form-control-sm" id="db_journal_category" name="db_journal_category" placeholder="Category" value={inputs.db_journal_category}>
                                            <option value="DEFAULT">-- Select Journal Category --</option>
                                            {
                                                journalCategories.map((journalCategory) => (
                                                    <option key={journalCategory.id} value={journalCategory.id}>{`${journalCategory.id} - ${journalCategory.name}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <small>Journal Account</small>
                                        <select onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="db_journal_account_id" name="db_journal_account_id" placeholder="Category" value={inputs.db_journal_account_id}>
                                            <option value="DEFAULT">-- Select Journal Account --</option>
                                            {
                                                dbJournalAccount.map((journalAccount) => (
                                                    <option key={journalAccount.id} value={journalAccount.id}>{`${journalAccount.id} - ${journalAccount.name}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <small>Category Account</small>
                                        <select onChange={(e) => getJournalAccountsByCategory(e,1)} className="form-control form-control-sm " id="cr_journal_category" name="cr_journal_category" placeholder="Category" value={inputs.cr_journal_category}>
                                            <option value="DEFAULT">-- Select Journal Category --</option>
                                            {
                                                journalCategories.map((journalCategory) => (
                                                    <option key={journalCategory.id} value={journalCategory.id}>{`${journalCategory.id} - ${journalCategory.name}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <small>Journal Account</small>
                                        <select onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="cr_journal_account_id" name="cr_journal_account_id" placeholder="Category" value={inputs.cr_journal_account_id}>
                                            <option value="DEFAULT">-- Select Journal Account --</option>
                                            {
                                               crJournalAccount.map((journalAccount) => (
                                                    <option key={journalAccount.id} value={journalAccount.id}>{`${journalAccount.id} - ${journalAccount.name}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="form-group col-12">
                                        <small>Description</small>
                                        <textarea value={inputs.description} onChange={(e) => onChangeText(e)} name="description" id="description" className="form-control form-control-sm " />
                                    </div>    
                                </div>
                            </>}
                        </div>
                        <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                    </div>
            </section>
        </div>
    );
}