import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContentHeader from '../../Component/ContentHeader';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';
import { getStsDbCr } from '../../Component/Helpers';

function JournalCategory(props) {

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
            <ContentHeader title="List Journal Categories" parentTitle="Journal Category"/> 

            <section className="content">

                <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">Journal Category</h3>
                    </div>
                    
                    <div className="card">
                        <div className="card-header">
                            <NavLink to="/journal-category/create" className="btn bg-primary">
                                    <i className="fas fa-plus"></i> Add Category
                            </NavLink>
                            <div className='float-right'>
                                <input type="text" value={searchBox} onChange={(e) => setSearchBox(e.target.value)} name='searchBox' className="form-control" placeholder="Search category" />
                            </div>
                        </div>
                        
                        <div className="card-body">
                            {
                                loading ? <div> Loading .... </div> :
                                <table id="tableProducts" className="table table-striped table-sm">
                                    <thead>
                                    <tr>
                                    <th>Category ID</th>
                                    <th>Category Name</th>
                                    <th>Debet/Credit</th>
                                    <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    {filteredCategory.map((category,index) => (
                                    <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>
                                    <td>{getStsDbCr(category.dbcr)}</td>
                                    <td>
                                        <NavLink to={`/category/edit/${category.category_id}`} className="btn bg-primary btn-xs mr-2">
                                            <i className="fas fa-trash"></i> Edit
                                        </NavLink>
                                        <button onClick={() => onDeleteHandler(category.category_id)} className="btn bg-danger btn-xs">
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

export default JournalCategory;