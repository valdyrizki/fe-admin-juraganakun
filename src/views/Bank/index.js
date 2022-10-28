import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContentHeader from '../../Component/ContentHeader';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';

function Bank(props) {

  const [banks,setBank] = useState([])
  const [filteredBank,setFilteredBank] = useState(banks)
  const [loading,setLoading] = useState(false)
  const [searchBox,setSearchBox] = useState('')
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)
      
  const getBank = async () => {
    setLoading(true)
    try{
        let {data} = await axios.get(`${ip}/bank/getall`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        setBank(data.data)
        setLoading(false)
    }catch(e){
        console.log(e.message);
        setLoading(false)
    }
  }
  
  const onDeleteHandler = (id) =>{
    showConfirm(async function (confirmed) {
        if(confirmed){
            try{
                setLoading(true)
                let {data} = await axios.delete(`${ip}/bank/${id}`,{
                    headers: {
                        'Authorization': 'Bearer '+token
                    }
                })
                if(data.isSuccess){
                    showSuccess(data.msg)
                    getBank();
                }else{
                    showError(data.msg)
                }
                setLoading(false)
            }catch(e){
                console.log(e.message);
                setLoading(false)
            }
        }
    });
  }

    useEffect( () =>{
        getBank(); 
    },[]) 

    useEffect(() => {
        setFilteredBank(
            banks.filter((bank) => bank.name.toUpperCase().indexOf(searchBox.toUpperCase()) !== -1)
        );
    }, [banks,searchBox]);

    return (
        <div className="content-wrapper">
            <ContentHeader title="List Bank Accounts" parentTitle="Bank Account"/> 

            <section className="content">

                <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">Bank Accounts</h3>
                    </div>
                    
                    <div className="card">
                        <div className="card-header">
                            <NavLink to="/bank/create" className="btn bg-primary">
                                    <i className="fas fa-plus"></i> Add Bank Account
                            </NavLink>
                            <div className='float-right'>
                                <input type="text" value={searchBox} onChange={(e) => setSearchBox(e.target.value)} name='searchBox' className="form-control" placeholder="Search Bank Account" />
                            </div>
                        </div>
                        
                        <div className="card-body">
                            {
                                loading ? <div> Loading .... </div> :
                                <table id="tableProducts" className="table table-striped table-sm">
                                    <thead>
                                    <tr>
                                    <th>No</th>
                                    <th>Bank ID</th>
                                    <th>Bank Name</th>
                                    <th>Account Number</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    {filteredBank.map((bank,index) => (
                                    <tr key={bank.id}>
                                    <td>{index+1}</td>
                                    <td>{bank.id}</td>
                                    <td>{bank.name}</td>
                                    <td>{bank.accnbr}</td>
                                    <td>{bank.description}</td>
                                    <td>{bank.status}</td>
                                    <td>
                                        <NavLink to={`/bank/edit/${bank.id}`} className="btn bg-primary btn-xs mr-2">
                                            <i className="fas fa-trash"></i> Edit
                                        </NavLink>
                                        <button onClick={() => onDeleteHandler(bank.id)} className="btn bg-danger btn-xs">
                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </td>
                                    </tr>
                                    ))}
                                    
                                    </tbody>
                                    
                                </table>
                            }
                            </div>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Bank;