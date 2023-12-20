import { useEffect, useRef, useState } from 'react';


let count = 0;
function Todo() {
  const [datas, setData] = useState([]); 

  const inputref = useRef(null);

  const addTodo = () => {
    setData(
        [...datas , {
            no : count++ ,
            data : inputref.current.value,
            display : ''
        }]
    ),
    inputref.current.value = '';
  }


  useEffect(
    () => {
        localStorage.getItem('todos') ? setData(JSON.parse(localStorage.getItem('todos'))) : setData([]);
    },[]
  )

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(datas));
  },[datas])


  return (
    <div>
      <div>
        <h1> Todo app</h1>
        <div>
            <input ref = {inputref} type = 'text' placeholder='enter a data'/>

            <button onClick={()=> addTodo()}> Add Todo</button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
