import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";
import style from "./PirateStyle.module.css"
    
const Update = (props) => {
    const history = useHistory();

    const { id } = useParams();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(''); 

    const [imageUrl, setImageUrl] = useState('');
    const [imageUrlError, setImageUrlError] = useState('');

    const [chests, setChests] = useState('');
    const [chestsError, setChestsError] = useState('');

    const [catchPhrase, setCatchPhrase] = useState('');
    const [catchPhraseError, setCatchPhraseError] = useState('');
    
    const [crewPosition,setCrewPosition] = useState('');
    const [crewPositionError, setCrewPositionError] = useState('');

    const [pegLeg,setPegLeg] = useState(true);
    const handlePegLeg=e=>{
        setPegLeg(e.target.checked)
    }
    const [eyePatch,setEyePatch] = useState(true);
    const handleEyePatch=e=>{
        setEyePatch(e.target.checked)
    }
    const [hookHand,setHookHand] = useState(true);
    const handleHookHand=e=>{
        setHookHand(e.target.checked)
    }


    const handleName=e=>{
        setName(e.target.value)
        if(e.target.value.length>1){
            setNameError('')
        }
        else{
            setNameError('Name is too short!')
        }
    }
    const handleImageUrl=e=>{
        setImageUrl(e.target.value)
        if(e.target.value.length>1){
            setImageUrlError('')
        }
        else{
            setImageUrlError('Image Url is too short!')
        }
    }
    const handleChests=e=>{
        setChests(e.target.value)
        if(e.target.value>=0){
            setChestsError('')
        }
        else{
            setChestsError('Too Few Chests!!')
        }
    }
    const handleCatchPhrase=e=>{
        setCatchPhrase(e.target.value)
        if(e.target.value>=0){
            setCatchPhraseError('')
        }
        else{
            setCatchPhraseError('Catch Phrase needs to be longer!!!')
        }
    }
    const handleCrewPosition=e=>{
        setCrewPosition(e.target.value)
        if(e.target.value != ""){
            setCrewPositionError('')
        }
        else{
            setCrewPositionError('Crew Position needed!')
        }
    }
    
    useEffect(() => {
        console.log(id)
        axios.get('http://localhost:8000/api/pirates/' + id)
            .then(res => {
                console.log("UE", res.data)
                setName(res.data.name);
                setImageUrl(res.data.imageUrl);
                setChests(res.data.chests);
                setCatchPhrase(res.data.catchPhrase);
                setCrewPosition(res.data.crewPosition);
                setPegLeg(res.data.pegLeg);
                setEyePatch(res.data.eyePatch);
                setHookHand(res.data.hookHand);
            })
    }, []);
    
    const updatePirate = e => {
        e.preventDefault();
            axios.put('http://localhost:8000/api/pirates/' + id, {
                name, imageUrl, chests, catchPhrase, crewPosition, pegLeg,eyePatch,hookHand
            })
                .then(res => {
                    if(!res.data.errors){
                        history.push('/pirates')
                    }
                    else{
                        setNameError(res.data.errors.name.message)
                        setImageUrlError(res.data.errors.imageUrl.message)
                        setChestsError(res.data.errors.chests.message)
                        setCatchPhraseError(res.data.errors.catchPhrase.message)
                        setCrewPositionError(res.data.errors.crewPosition.message)
                    }
            })
                .catch(err => console.log(err));
    }
    
    return (
        <div className={style.editor}>
            <h1>Update {name}</h1>
            <form onSubmit={updatePirate}>
                <div>
                    <label>Name:</label><br />
                    <input type="text" name="Name" value={name} 
                    onChange={(e) => {handleName(e)}} />
                    <p>{nameError}</p>
                </div>
                <div>
                    <label>Portait Url:</label><br />
                    <input type="text" name="ImageUrl" value={imageUrl} 
                    onChange={(e) => {handleImageUrl(e)}} />
                    <p>{imageUrlError}</p>
                </div>
                <div>
                    <label>Chests in the Booty:</label><br />
                    <input type="number" name="Chests" value={chests} 
                    onChange={(e) => {handleChests(e)}} />
                    <p>{chestsError}</p>
                </div>
                <div>
                    <label>Catch Phrase:</label><br />
                    <input type="text" name="catchPhrase" value={catchPhrase} 
                    onChange={(e) => {handleCatchPhrase(e)}} />
                    <p>{catchPhraseError}</p>
                </div>
                <label>Crew Position:</label>
                <select onChange={(e)=>{handleCrewPosition(e)}} value={crewPosition}>
                    <option value="">Select a Position</option>
                    <option value="First Mate">First Mate</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Boastwain">Boastwain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                    <option value="Captain">Captain</option>
                </select><br/>
                <p>{crewPositionError}</p>

                <input type="checkbox" name="pegLeg" checked={pegLeg} onChange={handlePegLeg}/>
                <label>Peg Leg</label><br/>
                <input type="checkbox" name="eyePatch" checked={eyePatch} onChange={handleEyePatch}/>
                <label>Eye Patch</label><br/>
                <input type="checkbox" name="hookHand" checked={hookHand} onChange={handleHookHand}/>
                <label>Hook Hand</label><br/>

                <input type="submit" />
            </form>
        </div>
    )
}
    
export default Update;