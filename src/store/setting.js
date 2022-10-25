import axios from "axios";
import { atom, selector } from "recoil";

export const serverIp = atom({
    key : 'serverIp-Atom',
    default : 'http://localhost:8000/api'
    // default : 'http://be.juraganakun.com/api'
})

export const serverUrl = atom({
    key : 'serverUrl-Atom',
    default : 'http://localhost:8000/'
    // default : 'http://be.juraganakun.com/'
})

export const getSettings = selector({
    key : 'getSetting-selector',
    get : async({get})=>{
        let settings = null
        const ip = get(serverIp)
        try{
            let {data} = await axios.get(`${ip}/setting`,{
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
                }
            });
            settings = data.data;
            return settings;
        }catch(e){
            console.log(e.getMessage);
        }
    }   
})

export const getFlgAutoStock = selector({
    key : 'getFlgAutoStock-selector',
    get : async({get})=>{
        const ip = get(serverIp)
        try{
            let {data} = await axios.get(`${ip}/setting/getall`,
            {
                headers: {
                    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
                }
            });
            let {setting_value} = data.data[0];
            return setting_value
        }catch(e){
            console.log(e.getMessage);
        }
    }   
})