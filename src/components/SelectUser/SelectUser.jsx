import { useContext } from "react"
import { UserContext } from "../../context/user.context"

function SelectUser() {
    const {userId, setUserId} = useContext(UserContext)
     const changeUser = (e) => {
          setUserId(Number(e.target.value))
     }

     return (
      <select name="user" id="user" value={userId} onChange={changeUser}>
          <option value="1">Adil</option>
          <option value="2">Ben</option>
          <option value="3">Jon</option>
          <option value="4">Martin</option>
             </select>
     )
}
export default SelectUser;
