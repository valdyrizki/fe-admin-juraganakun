import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContentHeader from '../../Component/ContentHeader';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';
import { getStsDbCr } from '../../Component/Helpers';

function Report(props) {

  const [journalCategories,setJournalCategory] = useState([])
  const [filteredCategory,setFilteredCategory] = useState(journalCategories)
  const [loading,setLoading] = useState(false)
  const [searchBox,setSearchBox] = useState('')
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)
      
  const getJournalCategory = async () => {
    setLoading(true)
    try{
        let {data} = await axios.get(`${ip}/journal-category`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        setJournalCategory(data.data)
        setLoading(false)
    }catch(e){
        console.log(e.message);
        setLoading(false)
    }
  }
  
  const onDeleteHandler = (category_id) =>{
    showConfirm(async function (confirmed) {
        if(confirmed){
            try{
                setLoading(true)
                let {data} = await axios.delete(`${ip}/journal-category/${category_id}`,{
                    headers: {
                        'Authorization': 'Bearer '+token
                    }
                })
                if(data.isSuccess){
                    showSuccess(data.msg)
                    getJournalCategory();
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
        getJournalCategory(); 
    },[]) 

    useEffect(() => {
        setFilteredCategory(
            journalCategories.filter((category) => category.name.toUpperCase().indexOf(searchBox.toUpperCase()) !== -1)
        );
    }, [journalCategories,searchBox]);

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
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                    <h4 className="card-title">Report Transaction</h4>
                    </div>
                    
                    <div className="card">
                        <div className="card-header">
                            <ul class="pagination pagination-month justify-content-center">
                                <li class="page-item"><a class="page-link" href="#">«</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Jan</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item active">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Feb</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Mar</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Apr</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">May</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Jun</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Jul</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Aug</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Sep</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Oct</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Nov</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#">
                                        <p class="page-month">Dec</p>
                                        <p class="page-year">2021</p>
                                    </a>
                                </li>
                                <li class="page-item"><a class="page-link" href="#">»</a></li>
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
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Report;