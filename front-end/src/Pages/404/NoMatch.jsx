import React from 'react'

import nomatch from "../../assets/404.png"

import "./NoMatch.css"
const NoMatch = () => {
  return (
    <div className='NotFound'>

        <img src={nomatch} alt="404" />
        <div>
            <a href="/home">go back</a>
        </div>
    </div>
  )
}

export default NoMatch