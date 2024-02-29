import { useHistory } from "react-router-dom";
import { getToken } from "../Helpers";

function Authenticated(props) {
  const history = useHistory();

  try {
    if (!getToken()) {
      history.push("/login");
      return;
    } else {
      return props.children;
    }
  } catch (e) {
    history.push("/login");
  }
}

export default Authenticated;
