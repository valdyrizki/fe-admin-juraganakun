import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContentHeader from '../../Component/ContentHeader';
import {  showError } from '../../Component/Template/Msg';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';

function Category(props) {

  const [settings,setSetting] = useState([])
  const [loading,setLoading] = useState(false)
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)
      
  const getSetting = async () => {
    setLoading(true)
    try{
        let {data} = await axios.get(`${ip}/setting/getall`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        setSetting(data.data)
        console.log(data.data);
        setLoading(false)
    }catch(e){
        console.log(e.message);
        setLoading(false)
    }
  }

  const changeHandler = async(e) =>{
    setLoading(true)
    try{
        const setting = {
            "setting_id" : e.target.id,
            "setting_value" : e.target.checked
        }
        try {
            let {data} = await axios.put(`${ip}/setting/update`,
            setting,
            {
                headers: {
                    'Authorization': 'Bearer '+token
                }
            });
            if(data.isSuccess){
                getSetting()
            }else{
                showError(data.msg)
            }
            setLoading(false)
        } catch (e) {
            console.log(e.message);
            setLoading(false)
        }
    }catch(e){
        console.log(e.getMessage);
    }
  }

    useEffect( () =>{
        getSetting(); 
    },[]) 

    return (
        <div className="content-wrapper">
            <ContentHeader title="List Settings" parentTitle="Setting"/> 
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Setting</h3>
                    </div>
                    <div className="card">
                        <div className="card-body">
                        {loading ? <div> Loading .... </div> :
                            <table id="tableSetting" className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Setting ID</th>
                                        <th>Setting Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {settings.map((setting) => (
                                    <tr key={setting.setting_id}>
                                        <td>{setting.setting_id}</td>
                                        <td>
                                        <div className="form-group">
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id={setting.setting_id} name={setting.setting_id} checked={setting.setting_value} onChange={(e) => changeHandler(e)} />
                                            <label className="custom-control-label" htmlFor={setting.setting_id}>{setting.setting_name}</label>
                                        </div>
                                        </div>
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

export default Category;