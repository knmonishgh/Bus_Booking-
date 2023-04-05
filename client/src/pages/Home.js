import React from 'react'
import { useDispatch, useSelector } from "react-redux";
function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>Home
      {user && <h1>welcome {user?.name}</h1>}
    </div>
  )
}

export default Home