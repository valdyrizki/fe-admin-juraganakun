import { authAtom } from '../../store/user';
import { useRecoilValue } from "recoil";
import { useHistory } from 'react-router-dom';

function Authenticated(props) {
    const auth = useRecoilValue(authAtom)
    const history = useHistory()

    try{
        if(auth === null){
            history.push("/login") 
            return
        }else{
            return props.children
        }
    }catch(e){
        history.push("/login") 
    }
    
    
}

export default Authenticated;   