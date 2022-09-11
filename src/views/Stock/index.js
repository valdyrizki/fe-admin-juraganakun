import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ContentHeader from '../../Component/ContentHeader';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { getCategory } from '../../store/category';
import { getFlgAutoStock, serverIp } from '../../store/setting';
import { tokenAtom } from '../../store/user';


export default function Stock(props) {
    //dispatcer & state metode hook
    const history = useHistory();
    const token = useRecoilValue(tokenAtom)
    const flgAutoStock = useRecoilValue(getFlgAutoStock)
    const ip = useRecoilValue(serverIp)
    const categories = useRecoilValue(getCategory)
    const [inputs,setInputs] = useState({
        files : []
    })
    const [products,setProducts] = useState([])
    const [files,setFiles] = useState([])
    const [fileName,setFileName] = useState("Choose File")

    const onChangeText = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const onChangeCategory = (e)=>{
        onChangeText(e)
        getProductsByCategory(e.target.value)
    }

    const onChangeFile = (e) => {
        setInputs({ ...inputs, "files[]": e.target.files })
        setFiles(e.target.files)
        setFileName(`${e.target.files.length} Files`)
    }

    const onSubmitHandler = (e) => { //upload stock handler
        e.preventDefault()
        showConfirm(async function (confirmed) {
            if (confirmed) {
                try{
                    let {data} = await axios.post(`${ip}/product/storestock`,inputs,
                    {
                        headers: {
                            "Authorization": "Bearer "+token,
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    if(data.isSuccess){
                        showSuccess(data.msg)
                        history.push("/product")
                        // refreshProducts()
                    }else{
                        showError(data.msg)
                    }
                }catch(e){
                    console.error(e.getMessage);
                }
            }
        });
    }

    const getProductsByCategory = async (category_id) => {
        try {
            let {data} = await axios.get(`${ip}/product/getbycategory`,{
                headers: {
                    'Authorization': 'Bearer '+token
                },
                params : {
                    category_id : category_id
                }
            });
            let products = data.data
            setProducts(products);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(()=>{
        if(!flgAutoStock){
            showError("Menu ini hanya digunakan jika produk menggunakan setting auto stock!")
            history.push("/home")
        }
    },[])

    return (
        <div className="content-wrapper">
            <ContentHeader title="Upload Stock" parentTitle="Stock"/> 
            <section className="content">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Form Stock</h3>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="card-body">
                            <div className='row'>
                                <div className="form-group col-3">
                                    <small>Category</small>
                                    <select onChange={(e) => onChangeCategory(e)} className="form-control form-control-sm " id="category_id" name="category_id" placeholder="Category" value={inputs.category_id}>
                                        <option value="DEFAULT">-- Select Category --</option>
                                        {
                                            categories.map((category) => (
                                                <option key={category.category_id} value={category.category_id}>{`${category.category_id} - ${category.category_name}`}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-5">
                                    <small>Product</small>
                                    <select onChange={(e) => onChangeText(e)} className="form-control form-control-sm " id="product_id" name="product_id" placeholder="Product" value={products.product_id}>
                                        <option value="DEFAULT">-- Select Product --</option>
                                        {
                                            products.map((product) => (
                                                <option key={product.product_id} value={product.product_id}>{`${product.product_id} - ${product.product_name}`}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-12">
                                    <input type="file" onChange={(e) => onChangeFile(e)} className="custom-file-input" id="files[]" name="files[]" multiple={true}/>
                                    <label className="custom-file-label" id="fileName">{fileName}</label>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                {Array.from(files).map((file,index)=>(
                                    <div className="col-1 text-center" key={index}>
                                        <div className="row">
                                            <div className="col text-center">
                                                <p width="200px" height="200px" className='fas fa-file-archive fa-2x' />
                                                <p>{file.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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