import { useEffect, useState } from 'react';
import { AddUser } from './addUser';
import axios from "axios"
import './App.css';

function App() {
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(false)
const [search,setSearch]=useState("")

  const getUser=async ()=>{
    try {
      setLoading(true)
      let response=await axios.get("http://localhost:8080/users")
      setLoading(false)
      setUsers(await response.data)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(()=>{
    getUser()
  },[])

const handleDelete=(id)=>{
  axios.delete(`http://localhost:8080/users/${id}`).then(()=>getUser())
}

  return (
    <div >
      <input type="text" name="search" onChange={(e)=>{setSearch(e.target.value)}}/>
      {
        loading ? ("Loading...") :(
          <>
          <AddUser users={users} setUsers={setUsers}/>
            <ul>
            {users.filter(item=>item.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((item,index)=>
             ( <li key={index}>
              <i className={`${item.imageUrl}`}></i>
              <h1>{item.fullName}</h1>
              <h1>{item.age}</h1>
              <h1>{item.userName}</h1>
              <button onClick={()=>handleDelete(item._id)}>Delete</button>
            </li>)
            )}
            </ul>
          </>
        )
      }
    </div>
  );
}

export default App;
