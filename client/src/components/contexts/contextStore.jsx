import {useState} from 'react'
import {CounterContext} from './CounterContext'

function Store({children}) {

  let [name,setName]= useState('');
  let [role, setRole] = useState('');
  let [userDet, setUserDet] = useState({});


  return (
    <CounterContext.Provider value={[userDet, setUserDet]}>
        {children}
    </CounterContext.Provider>
    // <CounterContext.Provider value={{ name, setName, role, setRole, userDet, setUserDet }}> {/* Provided all states and setters */}
    //   {children}
    // </CounterContext.Provider>
  )
}

export default Store;