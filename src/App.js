import Submitfield from './components/Submitfield';
import Items from './components/Items';
import { useReducer, useState } from 'react';
import DataDB from './components/data'
import './App.css';

function App() {
  const [data,dispatch] = useReducer(dataReducer,DataDB);
  const [count,setCount] = useState(0);
  const [editableData, setEditableData] = useState(null);
  const [ID,setID] = useState(-1);
  function dataReducer(data,action){
    const newData = [...data];
    switch(action.type){
      case 'ADD':
        return [...data,{id:data.length+1,content:action.payload1,done:action.payload2}];
      case 'DEL':
        const filteredData = data.filter((datas)=>datas.id!==action.payload);
        filteredData.forEach((datas,i)=>{
          datas.id = i+1;
        })
        return filteredData; 
      case 'UP':
        const id = action.payload;
        if(id>1){
          [newData[id-1],newData[id-2]] = [newData[id-2],newData[id-1]];
          newData[id-1].id = id;
          newData[id-2].id = id-1;
        }
        newData.forEach((data,i)=>{
          data.id = i+1;
        })
        return [...newData];
      case 'DW':
        const id2 = action.payload;
        if(id2<newData.length){
          [newData[id2-1],newData[id2]] = [newData[id2],newData[id2-1]];
          newData[id2-1].id = id2;
          newData[id2].id = id2+1;
        }
        newData.forEach((data,i)=>{
          data.id = i+1;
        })
        return [...newData];
      case 'ACI':
        newData[action.payload-1].done = true;
        return [...newData];
      case 'DCI':
        newData[action.payload-1].done = false;
        return [...newData];
      case 'UPD':
        newData[action.id-1].content = action.payload;
        return newData;
      default:
        return data;
    }
  }
  function dataset(content,done){
    dispatch({type:'ADD',payload1:content,payload2:done});
  }
  function deleteToDo(id,done){
    if(done){
      setCount(count-1);
    }
    dispatch({type:'DEL',payload:id})
  }
  function upBtn(id){
    dispatch({type:'UP',payload:id});
  }
  function downBtn(id){
    dispatch({type:'DW',payload:id});
  }
  function add_completed_item(id){
    setCount(count+1);
    dispatch({type:'ACI',payload:id});
  }
  function subtract_completed_item2(id){
    setCount(count-1);
    dispatch({type:'DCI',payload:id});
  }
  function update(id){
    setID(id);
    setEditableData(data[id-1]);
  }
  function updateData(datas){
    dispatch({type:'UPD',payload:datas,id:ID});
  }
  return (
    <div className="App">
      <div className='main-heading-container'>
        <h1 className='main-heading'>To Do List</h1>
      </div>
      <div className='items-list'>
        <Submitfield additems={dataset} setEditableData={setEditableData} editableData={editableData} total={data.length} completed={count} updateData={updateData}></Submitfield>
        {data.map((data)=>(
          <Items key={data.id} update={update} text={data.content} done = {data.done} deleteToDo={deleteToDo} id={data.id} upBtn={upBtn} downBtn={downBtn} completed_item={add_completed_item} completed_item2={subtract_completed_item2}></Items>
        ))}
      </div>
    </div>
  );
}

export default App;
