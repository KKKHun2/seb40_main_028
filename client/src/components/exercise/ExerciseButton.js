import React from "react";
import { useSetRecoilState } from "recoil";
import { timermodalState, doneState } from "../../state/states";

export function Smallerbutton ({name, fn}) {
  return (
    <button className="flex justify-center items-center rounded-lg w-28 h-[1em] ml-[3em] bg-gradient-to-b from-[#b8b9bf] to-[#808185] drop-shadow-2xl text-[#4E525A] font-bold" onClick={fn}>{name}</button>  
  );
};

export function Smallbutton ({name, fn, ifnext}) {
  return (
    <button className={`flex justify-center items-center rounded-lg w-[6em] h-[2.5em] ml-[2.5em] bg-d-dark drop-shadow-2xl text-white font-bold hover:bg-d-hover ${ifnext}`} onClick={fn}>{name}</button>  
  );
};

export function Setlistbutton ({x, idx, record}) {
  const setIstimermodalon = useSetRecoilState(timermodalState);
  const setDone = useSetRecoilState(doneState);
  const setclicked = () => {
    setDone(record);
    setIstimermodalon(true);
    console.log(record);
  }
  return(
    <div id={idx} className="flex cursor-default my-[0.6em] h-[2.8em] mx-[1.5em] border-none text-[1.5em] bg-gradient-to-b from-[#4E525A] to-[#36393F] drop-shadow-2xl ease-out hover:from-d-hover border-2 rounded-lg justify-center items-center font-bold text-white overflow-x-hidden whitespace-nowrap" 
      onClick={setclicked} >
      <div className='basis-1/5 ml-[0.2em] whitespace-nowrap'>{idx+1}세트</div>
      <div className='flex flex-row basis-3/5 justify-center items-center'>
        <span className='flex-nowrap whitespace-nowrap text-clip basis-1/2 mx-[0.5em]'>{x[0]}kg</span>
        <span className='flex-nowrap whitespace-nowrap text-clip basis-1/2'>{x[1]}회</span>
      </div>
      <div className='basis-1/5 justify-center items-center'>
        <button onClick={() => {console.log("clicked")}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="green" className="w-[2em] h-[2em]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </button>
      </div>  
    </div>
  );
};

export function Specificsetlistbutton ({x, idx, setState}) {
  return(
    <div id={idx} className="flex z-10 my-[0.6em] h-[2.8em] mx-[1.5em] border-none text-[1.5em] bg-gradient-to-b from-[#4E525A] to-[#36393F] drop-shadow-2xl hover:from-d-hover border-2 rounded-lg justify-center items-center font-bold text-white overflow-x-hidden whitespace-nowrap" 
      onClick={()=> {setState(idx)}}>{x}</div>
  );
}

export function Timebutton ({color, time}) {
  return(
    <div className={`${color} font-extrabold text-[1.7em]`}>
      {time}
    </div>
  );
};

export function Movingbutton () {
  return(
    <div className='flex-row w-[11em]'>
      <button className='mx-[0.1em]'>
        <svg 
          transform="scale(-1 -1)" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="3" 
          stroke="#b8b9bf" 
          className="w-[3em] h-[3em]"
        > 
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" 
          />
        </svg>
      </button>
      <button className='mr-[0.1em]'>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth="3" 
          stroke="#b8b9bf" 
          className="w-[3em] h-[3em]"
        > 
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" 
          />
        </svg>
      </button>
    </div>
  );
}