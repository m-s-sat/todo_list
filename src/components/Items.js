import './Items.css';
function Additems({text,id,deleteToDo,upBtn,downBtn,isDone,completed_item,completed_item2,done,update}){
    function isDone(id){
        if(done){
            completed_item2(id);
        }
        else{
            completed_item(id);
        }
    }
    return (
        <div className='list-container'>
            <div className='lists' onClick={()=>isDone(id)} style={{backgroundColor:done&&'#00693E', color:done&&'white'}}>
                <div className='text-container'>{text}</div>
            </div>
            <div className='button-container'>
                <button className="remove-btn" onClick={()=>deleteToDo(id,done)}>Remove</button>
                <button className='up-btn' onClick={()=>upBtn(id)}>Up</button>
                <button className='down-btn' onClick={()=>downBtn(id)}>Down</button>
                <button className='upate' onClick={()=>update(id)}>Update</button>
            </div>
        </div>
    )
}
export default Additems;