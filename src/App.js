import Submitfield from './components/Submitfield';
import Items from './components/Items';
import { useState } from 'react';
import DataDB from './components/data'
import './App.css';

function App() {
  const [data,setData] = useState(DataDB);
  const [count,setCount] = useState(0);
  function dataset(content,done){
    setData([...data, {id:data.length+1,content,done}]);
  }
  function deleteToDo(id,done){
    const newData = data.filter((datas)=>datas.id!==id);
    newData.forEach((data,i)=>{
      data.id = i+1;
    })
    if(done){
      setCount(count-1);
    }
    setData(newData);
  }
  function upBtn(id){
    const newData = [...data];
    if(id>1){
      [newData[id-1],newData[id-2]] = [newData[id-2],newData[id-1]];
      newData[id-1].id = id;
      newData[id-2].id = id-1;
    }
    newData.forEach((data,i)=>{
      data.id = i+1;
    })
    setData([...newData]);
  }
  function downBtn(id){
    const newData = [...data];
    if(id<newData.length){
      [newData[id-1],newData[id]] = [newData[id],newData[id-1]];
      newData[id-1].id = id;
      newData[id].id = id+1;
    }
    newData.forEach((data,i)=>{
      data.id = i+1;
    })
    console.log(newData);
    setData([...newData]);
  }
  function add_completed_item(id){
    const newData = [...data];
    newData[id-1].done = true;
    setData([...newData]);
    setCount(count+1);
  }
  function subtract_completed_item2(id){
    const newData = [...data];
    data[id-1].done = false;
    setData(newData);
    setCount(count-1);
  }
  
  return (
    <div className="App">
      <div className='main-heading-container'>
        <h1 className='main-heading'>To Do List</h1>
      </div>
      <div className='items-list'>
        <Submitfield additems={dataset} total={data.length} completed={count}></Submitfield>
        {data.map((data)=>(
          <Items key={data.id} text={data.content} done = {data.done} deleteToDo={deleteToDo} id={data.id} upBtn={upBtn} downBtn={downBtn} completed_item={add_completed_item} completed_item2={subtract_completed_item2}></Items>
        ))}
      </div>
    </div>
  );
}

export default App;
