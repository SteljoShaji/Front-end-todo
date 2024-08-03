import React, { createContext, useState } from 'react'
export const addTodoResponseContext = createContext()

function ContextShare({children}) {
    const [ addTodoResponse,setAddTodoResponse ] = useState({})
  return (
    <>
    <addTodoResponseContext.Provider value={{addTodoResponse,setAddTodoResponse}}>
        {children}
        </addTodoResponseContext.Provider>
    </>
  )
}

export default ContextShare