import React from 'react'
import loading from "./Loading.gif"

const Loader = () => {
    return(
        <div className="text-center">
            <img src={loading} alt="loading" className="my-3" />
        </div>
    )
}

export default Loader;