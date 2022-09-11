import axios from "axios";
import { atom, selector } from "recoil";
import { serverIp } from "./setting";

// const productsAtom = atom({
//     key:"products-atom",
//     default:getProducts()
// })

// const productSelector = selector({
//     key : 'getProducts-selector',
//     get : async({get})=>{
//         get(productsAtom)
//         return getProducts()
//     },
//     set : async({set})=>{
//         set(productsAtom,getProducts())
//     },
// })

export const productAtom = atom({
    key:"productAtom",
    default:{}
})

export const productsAtom = atom({
    key:"productsAtom",
    default:[]
})

export const productsSelector = selector({
    key : 'productsSelector',
    get : async({get})=>{
        let obj = [];
        const ip = get(serverIp)
        try{
            let {data} = await axios.get(`${ip}/product/getall`,{
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
                }
            })
            obj = data.data
        }catch(e){
            console.log(e.message);
        }
        return obj
    },
})