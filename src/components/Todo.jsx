import { useEffect, useRef, useState } from 'react';
import '../css/todo.css';


function Todo() {
    let count = 0;
    const [data,setData] = useState([]);

    const inputref = useRef(null);


    const addTodo = () => {
        setData([...data,{'no' : count++ , 'data' : inputref.current.value , display : ""}]);
        inputref.current.value = "";
    }

    useEffect( 
        () => {
            console.log(data);
        },[setData]

    )

    return (
        <div className='todo'>
            <div className='todo-header'>
                todo header
                <div className='todo-add'>
                    <input ref = {inputref}type='text' placeholder='add your task'/>
                </div>
                <div className='todo-list'>

                </div>
            </div>
        </div>
    );
}

export default Todo;