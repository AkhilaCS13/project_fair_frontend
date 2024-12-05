import React, { createContext, useState } from 'react'


export const addResponseContext = createContext({})
export const updateResponseContext = createContext({})
export const loginResponseContext = createContext({})

function Contextshare({children}) {
    const [addresponse, setaddresponse] = useState([])
    const [updateresponse, setupdateresponse] = useState([])
    const [loginresponse, setloginresponse] = useState(true)

    return (
        <div>
            <addResponseContext.Provider value={{addresponse, setaddresponse}}>
                <updateResponseContext.Provider value={{updateresponse, setupdateresponse}}>
                    <loginResponseContext value={{loginresponse, setloginresponse}}>
                        {children}
                    </loginResponseContext>
                </updateResponseContext.Provider>
            </addResponseContext.Provider>
        </div>
    )
}

export default Contextshare
