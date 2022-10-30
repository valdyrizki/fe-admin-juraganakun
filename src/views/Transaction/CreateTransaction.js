import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ContentHeader from '../../Component/ContentHeader';
import { decimalFormatter } from '../../Component/Helpers';
import { showConfirm, showError, showSuccess } from '../../Component/Template/Msg';
import { getCategory } from '../../store/category';
import { serverIp } from '../../store/setting';
import { tokenAtom } from '../../store/user';

function CreateTransaction(props) {
    //dispatcer & state metode hook
    const history = useHistory();
    const token = useRecoilValue(tokenAtom)
    const ip = useRecoilValue(serverIp)
    const categories = useRecoilValue(getCategory)
    const [order,setOrder] = useState({
        qty : 1,
        price:0
    })
    const [banks,setBanks] = useState([])
    const [stock,setStock] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const [carts,setCarts] = useState([])
    const [inputs,setInputs] = useState({
        client_name : "",
        phone_number : "",
        email : "viaadm@juraganakun.com",
        bank : 1,
        coupon : "",
        description : "",
        products : []
    })
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    const onChangeQty = (e) => {
        let subTotal = order.price * e.target.value
        setOrder({ ...order, [e.target.name]: e.target.value, subTotal : subTotal });
    }

    const onChangeCategory = (e)=>{
        setOrder({ ...order, [e.target.name]: e.target.value });
        getProductsByCategory(e.target.value)
    }

    const onChangeProduct = (e)=>{
        let selectedIndex = e.target.selectedIndex;
        let selectedLabel = e.target[selectedIndex].text
        let selectedPrice = e.target[selectedIndex].getAttribute('price')
        let selectedStock = e.target[selectedIndex].getAttribute('stock')
        let subTotal = selectedPrice * order.qty

        setStock(selectedStock)
        setOrder({ ...order, product_name: selectedLabel,price:selectedPrice,[e.target.name]: e.target.value, subTotal : subTotal });
    }

    const inputChange = (e) =>{
        setInputs({ ...inputs, [e.target.name]: e.target.value});
    }

    const onSubmitHandler = (e) => { //upload stock handler
        e.preventDefault()
        inputs.products = carts
        showConfirm(async function (confirmed) {
            if (confirmed) {
                setLoading(true)
                try{
                    let {data} = await axios.post(`${ip}/transaction/store`,inputs,
                    {
                        headers: {
                            "Authorization": "Bearer "+token
                        },
                    });
                    if(data.isSuccess){
                        showSuccess(data.msg)
                        history.push("/transaction")
                        // refreshProducts()
                    }else{
                        console.error(data.data);
                        showError(data.msg)
                    }
                }catch(e){
                    console.log(e.getMessage);
                }
                setLoading(false)
            }
        });
    }

    const getBanks = async () => {
        setLoading(true)
        try {
            let {data} = await axios.get(`${ip}/bank`,{
                headers: {
                    'Authorization': 'Bearer '+token
                }
            });
            setBanks(data.data);
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false)
    }

    const getProductsByCategory = async (category_id) => {
        setLoading(true)
        try {
            let {data} = await axios.get(`${ip}/product/getbycategory`,{
                headers: {
                    'Authorization': 'Bearer '+token
                },
                params : {
                    category_id : category_id
                }
            });
            let obj = data.data
            setProducts(obj);
        } catch (e) {
            console.log(e.message);
        }
        setLoading(false)
    }

    const addProduct = () => {
        if(parseInt(order.qty) > parseInt(stock)){
            showError("Pesanan melampaui stock, stock saat ini : "+stock)
        }else{
            setCarts((current)=>[...current,order])
            setTotalPrice(totalPrice+order.subTotal)
        }
    }

    useEffect( () =>{
        getBanks(); 
    },[]) 

    return (
        <div className="content-wrapper">
            <ContentHeader title="Create Transaction" parentTitle="Transaction"/> 
            <section className="content">
                <NavLink to="/transaction" className="btn bg-dark mb-2">
                    <i className="fas fa-arrow-left"></i> Back
                </NavLink>
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Form Input</h3>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="card-body">
                            {loading ? <div> Loading . . .</div> : <>
                                <div className='row'>
                                    <div className="form-group col-3">
                                        <small>Category</small>
                                        <select onChange={(e) => onChangeCategory(e)} className="form-control form-control-sm " id="category_id" name="category_id" placeholder="Category" value={order.category_id}>
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
                                        <select onChange={(e) => onChangeProduct(e)} className="form-control form-control-sm " id="product_id" name="product_id" placeholder="Product" value={order.product_id}>
                                            <option value="DEFAULT">-- Select Product --</option>
                                            {
                                                products.map((product) => (
                                                    <option key={product.product_id} value={product.product_id} price={product.price} stock={product.stock}>{`${product.product_id} - ${product.product_name}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-1">
                                        <small>Stock</small>
                                        <input type="text" className="form-control form-control-sm " id="stock" name="stock" placeholder="stock" maxLength="3" value={stock} disabled/>
                                    </div>
                                    <div className="form-group col-1">
                                        <small>Qty</small>
                                        <input type="text" onChange={(e) => onChangeQty(e)} className="form-control form-control-sm " id="qty" name="qty" placeholder="qty" maxLength="3" value={order.qty}/>
                                    </div>
                                    <div className="form-group col-2">
                                        <p></p>
                                        <p className='btn btn-primary btn-sm' onClick={addProduct}>Add Product</p>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className="form-group col-3">
                                        <small>Client Name</small>
                                        <input type='text' className='form-control form-control-sm' id='client_name' name='client_name' value={inputs.client_name} onChange={(e) => inputChange(e)} />
                                    </div>
                                    <div className="form-group col-3">
                                        <small>Email</small>
                                        <input type='email' className='form-control form-control-sm' id='email' name='email' value={inputs.email} onChange={(e) => inputChange(e)} />
                                    </div>
                                    <div className="form-group col-2">
                                        <small>Phone</small>
                                        <input type='text' className='form-control form-control-sm' id='phone_number' name='phone_number' value={inputs.phone_number} onChange={(e) => inputChange(e)} />
                                    </div>
                                    <div className="form-group col-2">
                                        <small>Bank Via</small>
                                        <select className="form-control form-control-sm " id="bank" name="bank" placeholder="Bank Via" value={inputs.bank} onChange={(e) => inputChange(e)}>
                                            {banks.map((bank) => (
                                                <option key={bank.id} value={bank.id}>{`${bank.name}`}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-2">
                                        <small>Coupon</small>
                                        <input type='text' className='form-control form-control-sm' id='coupon' name='coupon' value={inputs.coupon} onChange={(e) => inputChange(e)} />
                                    </div>
                                </div>
                                <div className='row'>
                                <div className="form-group col-12">
                                        <small>Description</small>
                                        <textarea className='form-control form-control-sm' id='description' name='description' value={inputs.description} onChange={(e) => inputChange(e)}   />
                                    </div>
                                </div>
                            
                                <div className="row">
                                    <div className="col-12 table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Qty</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.length<1 ? 
                                                <tr>
                                                    <td colSpan={4} className="text-center">No data</td>
                                                </tr> 
                                            : <></>}
                                            {carts.map((cart,index)=>(
                                                <tr key={index}>
                                                    <td>{cart.qty}</td>
                                                    <td>{cart.product_name}</td>
                                                    <td>{decimalFormatter(cart.price)}</td>
                                                    <td>{decimalFormatter(cart.subTotal)}</td>
                                                </tr>
                                            ))}
                                            {carts.length>0 ? 
                                                <tr>
                                                    <td colSpan={3} className="text-center">Total Price</td>
                                                    <td>Rp {decimalFormatter(totalPrice)}</td>
                                                </tr>
                                            :<></>}
                                        </tbody>
                                    </table>
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

export default CreateTransaction;