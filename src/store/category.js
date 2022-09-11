import axios from "axios";
import { selector } from "recoil";
import { serverIp } from "./setting";

const getCategory = selector({
    key : 'getCategory-selector',
    get : async({get})=>{
        let obj = [];
        const ip = get(serverIp)
        try{
            let {data} = await axios.get(`${ip}/category`,{
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
                }
            })
            obj = data.data
        }catch(e){
            console.log(e.message);
        }
        return obj
    }
})

export {getCategory}