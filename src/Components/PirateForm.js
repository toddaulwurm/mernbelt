
import React,{useState} from "react";
import axios from "axios";
import style from "./PirateStyle.module.css"
import {useHistory } from "react-router-dom";

export default ()=>{
    const [name,setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [imageUrl, setImageUrl] = useState('')
    const [imageUrlError, setImageUrlError] = useState('');

    const [chests,setChests] = useState(0);
    const [chestsError, setChestsError] = useState('');

    const [catchPhrase,setCatchPhrase] = useState('');
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


    const history = useHistory();

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
            setImageUrlError('ImageUrl is too short!')
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
        if(e.target.value.length>1){
            setCatchPhraseError('')
        }
        else{
            setCatchPhraseError('Catch Phrase is too short!')
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


    const onSubmitHandler = e =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/pirates',{
            name,imageUrl,chests, catchPhrase, crewPosition, pegLeg,eyePatch,hookHand
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

    return(
        <form onSubmit={onSubmitHandler} className={style.flexer}>
            <h1>Add an Pirate here!</h1>
                <label>Name:</label>
                <input type='text' onChange={(e)=>{handleName(e)}} value={name}/><br/>
            <p>{nameError}</p>
                <label>Portrait Url:</label>
                <input type='text' onChange={(e)=>{handleImageUrl(e)}} value={imageUrl}/><br/>
            <p>{imageUrlError}</p>
                <label>Number of Chests in the Booty:</label>
                <input type='number' onChange={(e)=>{handleChests(e)}} value={chests}/><br/>
            <p>{chestsError}</p>
                <label>Catch Phrase:</label>
                <input type='text' onChange={(e)=>{handleCatchPhrase(e)}} value={catchPhrase}/><br/>
            <p>{catchPhraseError}</p>
            <label>Crew Position:</label>
                <select onChange={(e)=>{handleCrewPosition(e)}}>
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



            <input type='submit' value='Add Pirate'/>
        </form>   
    )
}