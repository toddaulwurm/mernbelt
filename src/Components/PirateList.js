import React from 'react'
import style from "./PirateStyle.module.css"
import axios from 'axios';
import { Link } from "react-router-dom"


    
const PirateList = (props) => {
    const { removeFromDom } = props;
    
    const deletePirate = (pirateId) => {
        axios.delete('http://localhost:8000/api/pirates/' + pirateId)
            .then(res => {
                removeFromDom(pirateId)
            })
            .catch(err => console.error(err));
    }
    return (
        <div>
            {props.pirates.map( (pirate, i) =>{
                let url=`/pirates/${pirate._id}`;
                return (
                <div className={style.items} key={i}>
                    <img className={style.pics} src={pirate.imageUrl} alt="Pirate Pic"></img>
                    <h2><a href={url}>{pirate.name}</a></h2> <p>~~~~~</p>  
                    <Link to={"/pirates/" + pirate._id + "/edit"}>
                        <button>Edit</button>
                    </Link>                
                    <button onClick={(e)=>{deletePirate(pirate._id)}}>
                        Delete
                    </button>
                </div>)
            }
            )}
        </div>
    )
}
    
export default PirateList;