import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ContentHeader from '../../Component/ContentHeader';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { serverIp } from '../../store/setting';

function Category(props) {

  const [categories,setCategory] = useState([])
  const [filteredCategory,setFilteredCategory] = useState(categories)
  const [loading,setLoading] = useState(false)
  const [searchBox,setSearchBox] = useState('')
  const token = useRecoilValue(tokenAtom)
  const ip = useRecoilValue(serverIp)
      
  const getCategory = async () => {
    setLoading(true)
    try{
        let {data} = await axios.get(`${ip}/category/`,{
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        setCategory(data.data)
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
                let {data} = await axios.delete(`${ip}/category/${category_id}`,{
                    headers: {
                        'Authorization': 'Bearer '+token
                    }
                })
                if(data.isSuccess){
                    showSuccess(data.msg)
                    getCategory();
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
        getCategory(); 
    },[]) 

    useEffect(() => {
        setFilteredCategory(
            categories.filter((category) => category.category_name.toUpperCase().indexOf(searchBox.toUpperCase()) !== -1)
        );
    }, [categories,searchBox]);

    return (
        <div className="content-wrapper">
            <ContentHeader title="List Categories" parentTitle="Category"/> 

            <section className="content">

                <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">Category</h3>
                    </div>
                    
                    <div className="card">
                        <div className="card-header">
                            <NavLink to="/category/create" className="btn bg-primary">
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
                                    <th>No</th>
                                    <th>Category ID</th>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    
                                    {filteredCategory.map((category,index) => (
                                    <tr key={category.category_id}>
                                    <td>{index+1}</td>
                                    <td>{category.category_id}</td>
                                    <td>{category.category_name}</td>
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

export default Category;