import './Submitfield.css'
import { useState } from 'react';

let initialState = {
    content:''
}

function Submitfield({additems,total,completed}){
    const [data,setData] = useState(initialState);
    const [done,setDone] = useState(false);
    function handleChange(e){
        setData(e.target.value);
        setDone(false);
    }
    function handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        additems(data,done);
        setData(initialState);
    }
    return (
        <>
        <form className='form-container'>
            <input className='text-field' type='text' placeholder='Add Your Task Here....' name='work' onChange={handleChange} value={data.content}></input>
            <button className='submit-button' onClick={handleSubmit}>Add Items</button>
        </form>
        <div className='items-number'>
            Complete Items : {completed}/{total}
        </div>
        </>
    )
}
export default Submitfield;