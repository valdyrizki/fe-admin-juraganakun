import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ContentHeader from '../../Component/ContentHeader';
import { decimalFormatter } from '../../Component/Helpers';
import { serverIp } from '../../store/setting';
import { tokenAtom } from '../../store/user';

function Dashboard(props) {

    const [dashboard,setDashboard] = useState({
        todays_income:0,
        total_asset:0
    })
    const ip = useRecoilValue(serverIp)
    const token = useRecoilValue(tokenAtom)
    const [loading,setLoading] = useState()

    const getData = async()=>{
        try{
            setLoading(true)
            let {data} = await axios.get(`${ip}/home/getall`,{
                headers : {
                    'Authorization': 'Bearer '+token,
                    'Content-Type' : 'application/json'
                }
            })

            if(data.isSuccess){
                setDashboard(data.data)
                setLoading(false)
            }else{
                console.error(data);
                setLoading(false)
            }
        }catch(e){
            console.log(e);
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <div className="content-wrapper">
            <ContentHeader title="Dashboard" parentTitle="Home" />
            
            <section className="content">
            <div className="container-fluid">
                {loading ? <div>Loading . . .</div> : <>
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            
                            <div className="small-box bg-success">
                            <div className="inner">
                                <h3><sup style={{fontSize: '20px'}}>Rp</sup>{decimalFormatter(dashboard.todays_income)}</h3>
                                <p>Today's Income</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-cash"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{dashboard.complete_order}</h3>
                                <p>Complete Orders</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-checkmark"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{dashboard.pending_order}</h3>
                                <p>Pending Order</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-alert"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{dashboard.cancel_order}</h3>
                                <p>Cancel Order</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-close"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-success bg-gradient">
                            <div className="inner">
                                <h3><sup style={{fontSize: '20px'}}>Rp</sup>{decimalFormatter(dashboard.total_asset)}</h3>
                                <p>Total's Asset</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-cash"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{dashboard.total_order}</h3>
                                <p>Total Orders</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-bag"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-light">
                            <div className="inner">
                                <h3>{dashboard.total_user}</h3>
                                <p>Total User</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-add"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-danger">
                            <div className="inner">
                                <h3><sup style={{fontSize: '20px'}}>Rp</sup>0</h3>
                                <p>Total Expense</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-log-out"></i>
                            </div>
                            <a href="/#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                    <section className="col-lg-7 connectedSortable">
                        <div className="card direct-chat direct-chat-primary">
                        <div className="card-header">
                            <h3 className="card-title">Direct Chat</h3>

                            <div className="card-tools">
                            <span title="3 New Messages" className="badge badge-primary">3</span>
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus"></i>
                            </button>
                            <button type="button" className="btn btn-tool" title="Contacts" data-widget="chat-pane-toggle">
                                <i className="fas fa-comments"></i>
                            </button>
                            <button type="button" className="btn btn-tool" data-card-widget="remove">
                                <i className="fas fa-times"></i>
                            </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="direct-chat-messages">
                            <div className="direct-chat-msg">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-left">Alexander Pierce</span>
                                <span className="direct-chat-timestamp float-right">23 Jan 2:00 pm</span>
                                </div>
                                <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user" />
                                <div className="direct-chat-text">
                                Is this template really for free? That's unbelievable!
                                </div>
                            </div>
                            
                            <div className="direct-chat-msg right">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-right">Sarah Bullock</span>
                                <span className="direct-chat-timestamp float-left">23 Jan 2:05 pm</span>
                                </div>
                                <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user" />
                                <div className="direct-chat-text">
                                You better believe it!
                                </div>
                            </div>

                            <div className="direct-chat-msg">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-left">Alexander Pierce</span>
                                <span className="direct-chat-timestamp float-right">23 Jan 5:37 pm</span>
                                </div>
                                <img className="direct-chat-img" src="dist/img/user1-128x128.jpg" alt="message user" />
                                <div className="direct-chat-text">
                                Working with AdminLTE on a great new app! Wanna join?
                                </div>
                            </div>

                            <div className="direct-chat-msg right">
                                <div className="direct-chat-infos clearfix">
                                <span className="direct-chat-name float-right">Sarah Bullock</span>
                                <span className="direct-chat-timestamp float-left">23 Jan 6:10 pm</span>
                                </div>
                                <img className="direct-chat-img" src="dist/img/user3-128x128.jpg" alt="message user" />
                                <div className="direct-chat-text">
                                I would love to.
                                </div>
                            </div>

                            </div>

                            <div className="direct-chat-contacts">
                            <ul className="contacts-list">
                                <li>
                                <a href="/#">
                                    <img className="contacts-list-img" src="dist/img/user1-128x128.jpg" alt="User Avatar"/>

                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Count Dracula
                                        <small className="contacts-list-date float-right">2/28/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">How have you been? I was...</span>
                                    </div>
                                </a>
                                </li>
                                <li>
                                <a href="/#">
                                    <img className="contacts-list-img" src="dist/img/user7-128x128.jpg" alt="User Avatar"/>

                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Sarah Doe
                                        <small className="contacts-list-date float-right">2/23/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">I will be waiting for...</span>
                                    </div>
                                </a>
                                </li>
                                <li>
                                <a href="/#">
                                    <img className="contacts-list-img" src="dist/img/user3-128x128.jpg" alt="User Avatar"/>

                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Nadia Jolie
                                        <small className="contacts-list-date float-right">2/20/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">I'll call you back at...</span>
                                    </div>
                                </a>
                                </li>
                                <li>
                                <a href="/#">
                                    <img className="contacts-list-img" src="dist/img/user5-128x128.jpg" alt="User Avatar"/>

                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Nora S. Vans
                                        <small className="contacts-list-date float-right">2/10/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">Where is your new...</span>
                                    </div>
                                </a>
                                </li>
                                <li>
                                <a href="/#">
                                    <img className="contacts-list-img" src="dist/img/user6-128x128.jpg" alt="User Avatar"/>

                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        John K.
                                        <small className="contacts-list-date float-right">1/27/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">Can I take a look at...</span>
                                    </div>
                                </a>
                                </li>
                                <li>
                                <a href="/#">
                                    <img className="contacts-list-img" src="dist/img/user8-128x128.jpg" alt="User Avatar"/>

                                    <div className="contacts-list-info">
                                    <span className="contacts-list-name">
                                        Kenneth M.
                                        <small className="contacts-list-date float-right">1/4/2015</small>
                                    </span>
                                    <span className="contacts-list-msg">Never mind I found...</span>
                                    </div>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="card-footer">
                            <form action="#" method="post">
                            <div className="input-group">
                                <input type="text" name="message" placeholder="Type Message ..." className="form-control"/>
                                <span className="input-group-append">
                                <button type="button" className="btn btn-primary">Send</button>
                                </span>
                            </div>
                            </form>
                        </div>
                        
                        </div>
                    </section>
                    <section className="col-lg-5 connectedSortable">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">
                            <i className="ion ion-clipboard mr-1"></i>
                            To Do List
                            </h3>

                            <div className="card-tools">
                            <ul className="pagination pagination-sm">
                                <li className="page-item"><a href="/#" className="page-link">&laquo;</a></li>
                                <li className="page-item"><a href="/#" className="page-link">1</a></li>
                                <li className="page-item"><a href="/#" className="page-link">2</a></li>
                                <li className="page-item"><a href="/#" className="page-link">3</a></li>
                                <li className="page-item"><a href="/#" className="page-link">&raquo;</a></li>
                            </ul>
                            </div>
                        </div>
                        <div className="card-body">
                            <ul className="todo-list" data-widget="todo-list">
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v"></i>
                                <i className="fas fa-ellipsis-v"></i>
                                </span>
                                <div  className="icheck-primary d-inline ml-2">
                                <input type="checkbox" value="" name="todo1" id="todoCheck1"/>
                                <label htmlFor="todoCheck1"></label>
                                </div>
                                <span className="text">Design a nice theme</span>
                                <small className="badge badge-danger"><i className="far fa-clock"></i> 2 mins</small>
                                <div className="tools">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-o"></i>
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v"></i>
                                <i className="fas fa-ellipsis-v"></i>
                                </span>
                                <div  className="icheck-primary d-inline ml-2">
                                <input type="checkbox" value="" name="todo2" id="todoCheck2"/>
                                <label htmlFor="todoCheck2"></label>
                                </div>
                                <span className="text">Make the theme responsive</span>
                                <small className="badge badge-info"><i className="far fa-clock"></i> 4 hours</small>
                                <div className="tools">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-o"></i>
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v"></i>
                                <i className="fas fa-ellipsis-v"></i>
                                </span>
                                <div  className="icheck-primary d-inline ml-2">
                                <input type="checkbox" value="" name="todo3" id="todoCheck3"/>
                                <label htmlFor="todoCheck3"></label>
                                </div>
                                <span className="text">Let theme shine like a star</span>
                                <small className="badge badge-warning"><i className="far fa-clock"></i> 1 day</small>
                                <div className="tools">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-o"></i>
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v"></i>
                                <i className="fas fa-ellipsis-v"></i>
                                </span>
                                <div  className="icheck-primary d-inline ml-2">
                                <input type="checkbox" value="" name="todo4" id="todoCheck4"/>
                                <label htmlFor="todoCheck4"></label>
                                </div>
                                <span className="text">Let theme shine like a star</span>
                                <small className="badge badge-success"><i className="far fa-clock"></i> 3 days</small>
                                <div className="tools">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-o"></i>
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v"></i>
                                <i className="fas fa-ellipsis-v"></i>
                                </span>
                                <div  className="icheck-primary d-inline ml-2">
                                <input type="checkbox" value="" name="todo5" id="todoCheck5"/>
                                <label htmlFor="todoCheck5"></label>
                                </div>
                                <span className="text">Check your messages and notifications</span>
                                <small className="badge badge-primary"><i className="far fa-clock"></i> 1 week</small>
                                <div className="tools">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-o"></i>
                                </div>
                            </li>
                            <li>
                                <span className="handle">
                                <i className="fas fa-ellipsis-v"></i>
                                <i className="fas fa-ellipsis-v"></i>
                                </span>
                                <div  className="icheck-primary d-inline ml-2">
                                <input type="checkbox" value="" name="todo6" id="todoCheck6"/>
                                <label htmlFor="todoCheck6"></label>
                                </div>
                                <span className="text">Let theme shine like a star</span>
                                <small className="badge badge-secondary"><i className="far fa-clock"></i> 1 month</small>
                                <div className="tools">
                                <i className="fas fa-edit"></i>
                                <i className="fas fa-trash-o"></i>
                                </div>
                            </li>
                            </ul>
                        </div>
                        <div className="card-footer clearfix">
                            <button type="button" className="btn btn-primary float-right"><i className="fas fa-plus"></i> Add item</button>
                        </div>
                    </div>

                    
                    
                    </section>
                    </div> */}
                </>}
            </div>
            </section>
        </div>
    );
}

export default Dashboard;