import './Submitfield.css'
import { useEffect, useState } from 'react';

let initialState = {
    content:''
}

function Submitfield({additems,total,completed,editableData,updateData,setEditableData}){
    const [data,setData] = useState(initialState);
    const [done,setDone] = useState(false);
    function handleChange(e){
        setData(e.target.value);
        setDone(false);
    }
    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        if(editableData){
            updateData(data);
            setEditableData(null);
        }
        else{
            if(data===""){
                console.log("Entre valid work in textbox");
            }
            else{
                additems(data,done);
            }
        }
        setData(initialState);
    }
    useEffect(()=>{
        if(editableData){
            setData(editableData);
        }
    },[editableData])
    return (
        <>
        <form className='form-container'>
            <input className='text-field' type='text' placeholder='Add Your Task Here....' name='work' onChange={handleChange} value={data.content}></input>
            <button className='submit-button' onClick={handleSubmit}>{editableData?'Edit':'Add'} Items</button>
        </form>
        <div className='items-number'>
            Complete Items : {completed}/{total}
        </div>
        </>
    )
}
export default Submitfield;