import CardButton from "../CardButton/CardButton";
import "./JournalAdd.css";
function JournalAdd({clearForm}) {
     return (
       <CardButton className="journal-add" onClick = {clearForm}>
        <img src="/plus.png" alt="" width={'10px'} /> New memories
       </CardButton>
     )
}
export default JournalAdd;
