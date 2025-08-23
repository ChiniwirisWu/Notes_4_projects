import { useState, createContext, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useAudioPlayer, createAudioPlayer } from "expo-audio";

export interface SoundManagerContextType {
  musicOn:boolean,
  sfxOn:boolean,
  handleTurnOffMusic: ()=> void, 
  handleTurnOnMusic: ()=> void, 
  handlePlaySoundEffect: (soundType:SoundType)=> void,
  handleTurnOnSfx: ()=> void,
  handleTurnOffSfx: ()=> void,
};

export const SoundManagerContext = createContext<SoundManagerContextType>({
  musicOn:true,
  sfxOn:true,
  handleTurnOffMusic: ()=> {}, 
  handleTurnOnMusic: ()=> {}, 
  handlePlaySoundEffect: (soundType:SoundType)=> {},
  handleTurnOnSfx: ()=> {},
  handleTurnOffSfx: ()=> {},
});

export enum SoundType {
  touched,
  succeed,
  failed
};

export default function SoundManager({children}:{children:any}){
  const [musicOn, setMusicOn] = useState<boolean>(false);
  const [sfxOn, setSfxOn] = useState<boolean>(true);

  const soundTypes = {
    background: require("@/assets/Sfx/relaxing_piano_music.mp3"),
    touched: require("@/assets/Sfx/button-click.mp3"),
    succeed: require("@/assets/Sfx/succeed_sound.mp3"),
    failed: require("@/assets/Sfx/failed_sound.mp3"),
  };

  const backgroundPlayer = useAudioPlayer(soundTypes.background);
  backgroundPlayer.loop = true;
  backgroundPlayer.volume = 0.25;

  const effectsPlayer = useAudioPlayer(soundTypes.touched);
  effectsPlayer.loop = false;
  effectsPlayer.volume = 0.3;

  const handleTurnOffMusic = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundType.touched);
    };
    setMusicOn(false);
    backgroundPlayer.pause();
  };

  const handleTurnOnMusic = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundType.touched);
    };
    setMusicOn(true);
    backgroundPlayer.play();
  };

  const handlePlaySoundEffect = (soundType:SoundType)=>{
    if(!sfxOn){
      // it will only play if sfxOn == true;
      return;
    };

    switch(soundType){
      case SoundType.touched: 
        effectsPlayer.replace(soundTypes.touched);
        break;
      case SoundType.succeed:
        effectsPlayer.replace(soundTypes.succeed);
        break;
      case SoundType.failed:
        effectsPlayer.replace(soundTypes.failed);
        break;
      default:
        effectsPlayer.replace(soundTypes.touched);
        break;
    };
    effectsPlayer.seekTo(0);
    effectsPlayer.play();
  };

  const handleTurnOffSfx = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundType.touched);
    };
    setSfxOn(false);
  };

  const handleTurnOnSfx = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundType.touched);
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
