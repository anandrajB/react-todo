// import { useRef, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
// import Navbar from './components/navbar';
// import Content from './components/Content';

// function App() {

//   const [count, setCount] = useState(0);

//   const [data, setData] = useState([]);

//   let gender = 'male';
  
//   const btnclick = () => {
//     console.log("clicked")
//     setCount(count + 1)
//   }

//   const inputref = useRef(null);
//   return (
//     <div className='text-3xl'>
//       {/* {gender === 'male' ? <h1>Male</h1> : <h1>Female</h1>} */}
//       <input ref = {inputref} className = 'border border-solid border-blue-500' type='text' />
//       <button class="btn btn-blue"  onClick={() => {setData([...data,inputref.current.value])}}>
//       Button
//     </button>

//     {
//       data.map((item,index) => {
//         return <h1 key = {index}>{item}</h1> 
//       })
//     }
//      {/* <button onClick={btnclick}>Click</button>
//       <Content data = {count} fn = {setCount}/> */}
//     </div>
//   );
// }

// export default App;




import { useState } from 'react';
import Content from './components/Content';
import { useRef } from 'react';
import Todo from './components/Todo';



// function App() {

//   const [count, setCount] = useState(0);
//   const [data , setData] = useState([]);

//   const clicked = () => {
//     setCount(count + 1)
//   }

//   const inputref = useRef(null);

//   return (<div>
//     <h1>welcome to connect.io</h1>
//     <button onClick={clicked}>click</button>
//     <Content data={count} fn={setCount}/>

//     <input ref={inputref} type="text" />
//     <button onClick={() => {setData([...data , inputref.current.value])}}>click</button>
//     {
//       data.map((item , index) => {return <h1 key={index}>{item}</h1> } )
//     }
//     <Todo/>
//   </div>);
// }

// export default App;



function App() {
  return (<div>
    <Todo/>
  </div>);
}

export default App;