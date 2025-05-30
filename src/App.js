import "./styles.css";
import React, { useState, useCallback, useMemo, useEffect } from 'react'

export default function App() {

  const [input, setInput] = useState("")
  const [results, setResults] = useState({})
  const [focus, setFocus] = useState(false)
  const [cache, setCache] = useState({})

  const fetchData = async () => {
    if(input === "")
    {
      setResults(null)
      return;
    }
    if(cache[input])
    {
        setResults(cache[input])
        return;
    }
    const res = await fetch("https://dummyjson.com/recipes/search?q="+input)
    const data = await res.json();
    // console.log(data)
    setResults(data?.recipes)
    setCache(((prev) => {
      return {...prev, [input]: data?.recipes}
    }))
  }

  useEffect(() => {
    // fetch data
    const timer = setTimeout(fetchData, 300)
    return () => {
      clearTimeout(timer)
    }
  },[input])

  // const _handleChange = useCallback((e) => {
  //         setInput(e.target.value)
  //   }, [])

    const _handleKeyDown = useCallback((event) => {
          if (event.key === 'Escape') {
            console.log("welcome")
            setInput("")
          }
      }, [])

  return (
    <div className="App">
      <h1>Search</h1>

      <div>
          <input className="search-input"
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onKeyDown={_handleKeyDown}
          />
      </div>
      { focus &&
        <div className="results-container">
      {
        results && results.map((r) => {
          return (
            <span key={r.id}
              className="result">
              {r.name}
            </span>
          )
        })
      }
      </div>}
    </div>
  );
}
