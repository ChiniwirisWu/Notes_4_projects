import { useState, createContext, useEffect } from "react";
import { useAudioPlayer, AudioSource, createAudioPlayer, AudioPlayer } from "expo-audio";
import { songs, soundEffects } from "@/constants/songsAndSounds";
import { generateRandomInteger } from "@/constants/functions";

export interface SoundManagerContextType {
  musicOn:boolean,
  sfxOn:boolean,
  handleTurnOffMusic: ()=> void, 
  handleTurnOnMusic: ()=> void, 
  handlePlaySoundEffect: (soundEffect:SoundEffect)=> void,
  handleTurnOnSfx: ()=> void,
  handleTurnOffSfx: ()=> void,
};

export const SoundManagerContext = createContext<SoundManagerContextType>({
  musicOn:true,
  sfxOn:true,
  handleTurnOffMusic: ()=> {}, 
  handleTurnOnMusic: ()=> {}, 
  handlePlaySoundEffect: (soundEffect:SoundEffect)=> {},
  handleTurnOnSfx: ()=> {},
  handleTurnOffSfx: ()=> {},
});


export enum SoundEffect {
  bump, // 1
  click, // 2
  success, // 3
  fail, // 4
  open, // 5
  close, // 6
  last_item
};

const songsPlayed:number[] = [];
let previousSong:number = 0;

function pickRandomSong() : AudioSource{
  // currently there are 12 songs.
  const FIRST_SONG_INDEX = 0;
  const LAST_SONG_INDEX = 11;
  let songChoosen = previousSong;

  if(songsPlayed.length < 1){
     songChoosen = generateRandomInteger(FIRST_SONG_INDEX, LAST_SONG_INDEX); 
     previousSong = songChoosen;

  } else {
    while(songsPlayed.includes(songChoosen)){
     songChoosen = generateRandomInteger(FIRST_SONG_INDEX, LAST_SONG_INDEX); 
     previousSong = songChoosen;
    }
  }

  return songs[songChoosen];
};

export default function SoundManager({children}:{children:any}){
  const [backgroundPlayer, setBackgroundPlayer] = useState<AudioPlayer>(createAudioPlayer(pickRandomSong()));
  const [effectsPlayer, setEffectsPlayer] = useState<AudioPlayer>(createAudioPlayer());
  const [musicOn, setMusicOn] = useState<boolean>(false);
  const [sfxOn, setSfxOn] = useState<boolean>(true);

  useEffect(()=>{

    backgroundPlayer.loop = false;
    backgroundPlayer.volume = 0.3;
    backgroundPlayer.play();

    effectsPlayer.loop = false;
    effectsPlayer.volume = 0.3;

    setInterval(async ()=>{
      console.log(backgroundPlayer.currentStatus);
      if(backgroundPlayer.currentStatus.didJustFinish){
        console.log(backgroundPlayer.currentStatus)
        backgroundPlayer.replace(pickRandomSong());
        backgroundPlayer.seekTo(0);
        backgroundPlayer.play();
      };
    }, 1000);
  }, []);
  
  const handleTurnOffMusic = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundEffect.bump);
    };
    setMusicOn(false);
    backgroundPlayer.pause();
  };

  const handleTurnOnMusic = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundEffect.bump);
    };
    setMusicOn(true);
    backgroundPlayer.play();
  };

  const handlePlaySoundEffect = (soundEffect:SoundEffect)=>{
    if(!sfxOn){
      // it will only play if sfxOn == true;
      return;
    };

    switch(soundEffect){
      // opening a list, adding elements.
      case SoundEffect.bump: 
        effectsPlayer.replace(soundEffects.bump);
        break;
      // CRUD for notes.
      case SoundEffect.success:
        effectsPlayer.replace(soundEffects.success);
        break;
      // Backend errors.
      case SoundEffect.fail:
        effectsPlayer.replace(soundEffects.fail);
        break;
      // Message boxes
      case SoundEffect.open:
        effectsPlayer.replace(soundEffects.open);
        break;
      // Message boxes
      case SoundEffect.close:
        effectsPlayer.replace(soundEffects.close);
        break;
      // Marking a requirement as completed.
      case SoundEffect.click:
        effectsPlayer.replace(soundEffects.click);
        break;
      default:
        effectsPlayer.replace(soundEffects.bump);
        break;
    };
    effectsPlayer.seekTo(0);
    effectsPlayer.play();
  };

  const handleTurnOffSfx = ()=>{
    setSfxOn(false);
  };

  const handleTurnOnSfx = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundEffect.bump);
    };
    setSfxOn(true);
  };

  return (
    <SoundManagerContext 
      value={{
        musicOn,
        sfxOn,
        handleTurnOnMusic, 
        handleTurnOffMusic, 
        handlePlaySoundEffect,
        handleTurnOnSfx,
        handleTurnOffSfx
      }}>
      {children}
    </SoundManagerContext>
  );
};
