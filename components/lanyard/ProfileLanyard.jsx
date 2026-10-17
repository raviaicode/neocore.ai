import React, { useEffect, useState } from 'react';
import Lanyard from './Lanyard';
import './profile-lanyard.css';
const photo='resource/profile/ravi-singh.png';
export default function ProfileLanyard(){
  const [quiet,setQuiet]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const q=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setQuiet(q.matches);q.addEventListener('change',update);return()=>q.removeEventListener('change',update);},[]);
  return <figure className="profile-lanyard" aria-label="Ravi Singh, Java backend engineer and tech lead">
    <div className="profile-lanyard__stage">
      <div className="profile-lanyard__fallback"><img src={photo} alt="Ravi Singh" width="1406" height="1494"/></div>
      {!quiet&&<Lanyard frontImage={photo} backImage={photo} imageFit="cover" cardColor="#111d27"
        strapColor="#203638" metal="graphite" finish="matte" size={0.62} strapLength={0.28}
        breeze={0.32} damping={0.55} elasticity={0.3} interactive intro={!quiet} cornerRadius={0.2}/>} 
    </div>
    <figcaption><strong>Ravi Singh</strong><span>JAVA BACKEND ENGINEER · TECH LEAD</span><small>{quiet?'Animation paused':'Drag to swing · tap to flip'}</small><button className="profile-lanyard__toggle" type="button" aria-pressed={!quiet} onClick={()=>setQuiet(value=>!value)}>{quiet?'Play lanyard':'Pause motion'}</button></figcaption>
  </figure>;
}
