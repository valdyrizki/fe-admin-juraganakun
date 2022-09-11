
import { atom } from "recoil";

const authAtom = atom({
    key:"auth-atom",
    default :JSON.parse(localStorage.getItem('auth'))
})

const userAtom = atom({
    key:"user-atom",
    default :JSON.parse(localStorage.getItem('user'))
})

const tokenAtom = atom({
    key:"token-atom",
    default :JSON.parse(localStorage.getItem('token'))
})

export {authAtom,userAtom,tokenAtom}