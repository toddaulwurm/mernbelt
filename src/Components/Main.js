import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PirateList from './PirateList';
import style from "./PirateStyle.module.css"

export default () => {
    const [pirates, setPirates]=useState([])
    const [loaded, setLoaded]=useState(false);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/pirates')
            .then(res=>{
                setPirates(res.data);
                setLoaded(true);
            })
            .catch(err => console.error(err));
    },[pirates]);
    const removeFromDom = pirateId => {
        setPirates(pirates.filter(pirate => pirate._id != pirateId));
    }
    
    return (
        <div className={style.crew}>
            {loaded && <PirateList pirates={pirates} removeFromDom={removeFromDom}/>}
        </div>
    )
}