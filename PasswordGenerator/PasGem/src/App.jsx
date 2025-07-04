import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [symAllowed, setSymAllowed] = useState(false)
  const [pass, setPass] = useState("")

  const passwordRef = useRef(null)

  const passGen = useCallback( ()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+="0123456789"
    if(symAllowed) str+="!@#$%^&*()_-+=`"

    for(let i=1 ; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPass(pass);

  } , [length, numAllowed, symAllowed, setPass])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(pass)
  },[pass])
  

  useEffect(()=>{
    passGen()
  }, [length, numAllowed, symAllowed, passGen])

  return (  
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-white'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
         type="text" 
         value={pass}
         ref={passwordRef}
          className='outline-none w-full py-1 px-3 bg-gray-200 text-gray-800' 
          placeholder='password'
          readOnly />
          <button 
          className='rounded-lg outline-none shrink-0 py-0.5 px-3 rounded-l-none bg-blue-400 text-white cursor-pointer hover:opacity-50
          'onClick={copyPasswordToClipboard}
          >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 
        '>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer '
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked = {numAllowed}
          id = "numberInput"
          onChange={()=>{
            setNumAllowed((prev) => !prev);
          }}
           />
           <label htmlFor="numberInput">Numbers</label>
          <input 
          type="checkbox"
          defaultChecked = {symAllowed}
          id = "symbolInput"
          onChange={()=>{
            setSymAllowed((prev) => !prev);
          }}
           />
           <label htmlFor="symbolInput">Symbols</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
