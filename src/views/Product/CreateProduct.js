import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import ContentHeader from '../../Component/ContentHeader';
import { decimalFormatter} from '../../Component/Helpers';
import {showConfirm, showError, showSuccess} from '../../Component/Template/Msg'
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { tokenAtom } from '../../store/user';
import { getCategory } from '../../store/category';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getFlgAutoStock, serverIp } from '../../store/setting';
import { productsSelector } from '../../store/product';


function CreateProduct(props) {

    //dispatcer & state metode hook
    const [inputs,setInputs] = useState({
        price : "", 
        cogs : "",
        status : 1
    })
    const refreshProducts = useRecoilRefresher_UNSTABLE(productsSelector);
    const history = useHistory();
    const token = useRecoilValue(tokenAtom)
    const categories = useRecoilValue(getCategory)
    const flgAutoStock = useRecoilValue(getFlgAutoStock)
    const [imageName,setImageName] = useState("Choose Image")
    const [srcImage,setSrcImage] = useState("")
    const ip = useRecoilValue(serverIp)

    const onChangeText = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const onChangeDesc = (value) => {
        setInputs({ ...inputs, description: value });
    }
    const onChangeFile = (e) => {
        let selectedFile = e.target.files[0]
        setImageName(selectedFile.name)
        setInputs({ ...inputs, [e.target.name]: selectedFile })

        // load preview
        const objectUrl = URL.createObjectURL(selectedFile)
        setSrcImage(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }

    const doRemoveImg = () =>{
        setImageName("Choose Image")
        setSrcImage("")
    }

    const onChangeDecimal = (e) =>{
        let decimalFormat = decimalFormatter(e.target.value)
        setInputs({ ...inputs, [e.target.name]: decimalFormat });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        showConfirm(async function (confirmed) {
            if (confirmed) {
                try{
                    let {data} = await axios.post(`${ip}/product`,
                    inputs,
                    {
                        headers: {
                            "Authorization": "Bearer "+token,
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    if(data.isSuccess){
                        showSuccess(data.msg)
                        history.push("/product")
                        refreshProducts()
                    }else{
                        console.error(data.data);
                        showError(data.msg)
                    }
                }catch(e){
                    console.log(e.getMessage);
                }
            }
        });
    }
    return (
        <div className="content-wrapper">
            <ContentHeader title="Create Product" parentTitle="Product"/> 
            <section className="content">
                <NavLink to="/product/" className="btn bg-dark mb-2">
                    <i className="fas fa-arrow-left"></i> Back
                </NavLink>
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Form Product</h3>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="form-group col-2">
                                    <small>Product ID</small>
                                    <input type="text" onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="product_id" name="product_id" placeholder="Product ID" maxLength="4"/>
                                </div>
                                <div className="form-group col-3">
                                    <small>Category</small>
                                    <select onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="category_id" name="category_id" placeholder="Category" value={inputs.category_id}>
                                        <option value="DEFAULT">-- Select Category --</option>
                                        {
                                            categories.map((category) => (
                                                <option key={category.category_id} value={category.category_id}>{`${category.category_id} - ${category.category_name}`}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-7">
                                    <small>Product Name</small>
                                    <input type="text" onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="product_name" name="product_name" placeholder="Product Name" maxLength="50" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-1">
                                    <small>Stock</small>
                                    <input type="text" onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="stock" name="stock" placeholder="Stock" value={0} maxLength="4" disabled={flgAutoStock}/>
                                </div>
                                <div className="form-group col-3">
                                    <small>Cogs</small>
                                    <input type="text" onChange={(e) => onChangeDecimal(e)} className="form-control form-control-sm " value={inputs.cogs} id="cogs" name="cogs" placeholder="Basic Price"/>
                                </div>
                                <div className="form-group col-3">
                                    <small>Price</small>
                                    <input type="text" onChange={(e) => onChangeDecimal(e)} className="form-control form-control-sm " value={inputs.price} id="price" name="price" placeholder="Sell Price"/>
                                </div>
                                <div className="form-group col-2">
                                    <small>Status</small>
                                    <select onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="status" name="status" placeholder="Status" value={inputs.status}>
                                        <option value="1">Aktif</option>   
                                        <option value="0">Tidak aktif</option>    
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <small>Distributor</small>
                                    <input type="text" onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="distributor" name="distributor" placeholder="Distributor" maxLength={100}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <small>Description</small>
                                    <ReactQuill theme="snow" onChange={onChangeDesc} id="description" name="description" value={inputs.description} style={{height:"200px",marginBottom:"20px"}} />
                                    {/* <input type="text" onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="description" name="description" placeholder="Description"/> */}
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className="form-group col-12">
                                    <input type="file" onChange={(e) => onChangeFile(e)} className="custom-file-input" id="image" name="image"/>
                                    <label className="custom-file-label" id="fileName">{imageName}</label>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                {srcImage ? 
                                    <div className="col-12 text-center">
                                        <div className="row">
                                            <div className="col text-center">
                                                <img src={srcImage} alt="Preview" width="200px" height="200px" className='rounded' />
                                            </div>
                                        </div>
                                        <div className="row mt-2">
                                            <div className="col text-center">
                                                <p className="btn btn-danger" onClick={doRemoveImg}>X</p>
                                            </div>
                                        </div>
                                    </div>
                                : ''}
                            </div>
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

export default CreateProduct;