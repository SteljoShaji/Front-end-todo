import React, { createContext, useState } from 'react'
export const addTodoResponseContext = createContext()
export const editTodoResponseContext = createContext()

function ContextShare({children}) {
    const [ addTodoResponse,setAddTodoResponse ] = useState({})
    const [ editTodoResponse,setEditTodoResponse ] = useState({})
  return (
    <>
    <addTodoResponseContext.Provider value={{addTodoResponse,setAddTodoResponse}}>
        <editTodoResponseContext.Provider value={{editTodoResponse,setEditTodoResponse}}>
          {children}
          </editTodoResponseContext.Provider>
        </addTodoResponseContext.Provider>
    </>
  )
}

export default ContextShare