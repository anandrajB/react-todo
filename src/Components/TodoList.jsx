function TodoList({no , data , display , setData}) {

    const delete_data = (id) => {
        let data = localStorage.getItem('data');
        console.log(data);
        setData(JSON.parse(data).filter(item => item.no !== id));
    }


    
    return (<div>
        <div>
            {data}
            <button className='pl-10' onClick={() => delete_data(no)}>&#9747;</button>
        </div>
    </div>);
}

export default TodoList;