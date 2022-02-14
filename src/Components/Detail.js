
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams,Link,BrowserRouter } from "react-router-dom";
import style from "./PirateStyle.module.css"
    
const Detail = (props) => {
    const [pirate, setPirate] = useState({})
    const { id } = useParams();
    const { removeFromDom } = props;
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/pirates/' +id)
            .then(res => setPirate(res.data))
            .catch(err => console.error(err));
    }, []);
    const deletePirate = (pirateId) => {
        axios.delete('http://localhost:8000/api/pirates/' + pirateId)
            .then(res => {
                removeFromDom(pirateId)

            })
            .catch(err => console.error(err));
    }

    
    return (
        <div className={style.single}>
            <h1 className={style.catchPhrase}><em>"{pirate.catchPhrase}"</em></h1>
            <h1>{pirate.name}</h1>
            <img className={style.pics} src={pirate.imageUrl} alt="Pirate Pic"></img><br/>
            <h2>Booty: {pirate.chests}</h2>
            <h2>Crew Position: {pirate.crewPosition}</h2>
            <h4>Peg Leg: {pirate.pegLeg?"Yes":"Not Yet"}</h4>
            <h4>Eye Patch: {pirate.eyePatch?"Yes":"Not Yet"}</h4>
            <h4>Hook Hand: {pirate.hookHand?"Yes":"Not Yet"}</h4>
            <Link to={"/pirates/" + pirate._id + "/edit"}>
                Edit
            </Link>
            <Link to={"/pirates/"}>
                <button onClick={(e)=>{deletePirate(pirate._id)}}>
                    Delete
                </button>
            </Link>
        </div>
    )
}
    
export default Detail;