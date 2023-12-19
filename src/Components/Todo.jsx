import { useEffect, useRef, useState } from 'react';
import TodoList from './TodoList';


let count = 0;

function Todo() {

    const [data , setData] = useState([]);

    const inputref = useRef(null);

    const addTodo = () => {
        setData(
            [...data , {
                no : count++,
                data : inputref.current.value,
                display : ''
            }]
        );
        inputref.current.value = '';
    }

    useEffect (() => {
        // when page gets a reload handle it
        setData(localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [] );
    },[])

    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('data', JSON.stringify(data));
        }, 100); 
    }, [data]);

    return (<div className='flex  flex-col justify-center'>
        <div className='bg-white pt-4 my-5 '>
            <p>welcome to todo</p>
            <p>add your todo data</p>
            <div>
                <input className='pl-4' ref = {inputref} type = 'text' placeholder='add a text'/>
                <button onClick = {()=> addTodo()} className="bg-blue-500 hover:bg-blue-700 text-white font-light py-1 px-4 mx-4 rounded-full">
                Button
                </button>
                <div>
                    {data.map((item) => (
                        <div key={item.no}>
                            <TodoList no = {item.no} data = {item.data} display={item.display} setData={setData}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div></div>
    </div>);
}

export default Todo;