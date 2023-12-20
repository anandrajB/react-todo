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


    useEffect (() => {
        setData(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [] );
    },[])

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('data', JSON.stringify(datas));
        }, 100); 
    }, [datas]);


  return (
    <div>
      <div>
        <h1> Todo app</h1>
        <div>
            <input ref = {inputref} type = 'text' placeholder='enter a data'/>

            <button onClick={()=> addTodo()}> Add Todo</button>
        </div>
        <div>
            {datas.map(
                (item,index) => {
                    return <p key = {index}>{item.data}</p>
                }
            )}
        </div>
      </div>
    </div>
  );
}

export default Todo;


