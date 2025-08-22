import { useState, createContext, useEffect, useCallback } from "react";
import { View } from "react-native";
import { useAudioPlayer, createAudioPlayer } from "expo-audio";

export interface SoundManagerContextType {
  handleTurnOffMusic: ()=> void, 
  handleTurnOnMusic: ()=> void, 
  handlePlaySoundEffect: (soundType:SoundType)=> void,
  handleTurnOnSfx: ()=> void,
  handleTurnOffSfx: ()=> void,
};

export const SoundManagerContext = createContext<SoundManagerContextType>({
  handleTurnOffMusic: ()=> {}, 
  handleTurnOnMusic: ()=> {}, 
  handlePlaySoundEffect: (soundType:SoundType)=> {},
  handleTurnOnSfx: ()=> {},
  handleTurnOffSfx: ()=> {},
});

export enum SoundType {
  pressed,
  succeed,
  failed
};

export default function SoundManager({children}:{children:any}){
  const [musicOn, setMusicOn] = useState<boolean>(false);
  const [sfxOn, setSfxOn] = useState<boolean>(true);

  useEffect(useCallback(()=>{
    (musicOn) ? backgroundPlayer.play() : backgroundPlayer.pause();
    console.log(backgroundPlayer.isLoaded);
    console.log(effectsPlayer.isLoaded);
  }, [])); 

  const soundTypes = {
    background: require("@/assets/Sfx/relaxing_piano_music.mp3"),
    pressed: require("@/assets/Sfx/select_sound.mp3"),
    succeed: require("@/assets/Sfx/select_sound.mp3"),
    failed: require("@/assets/Sfx/select_sound.mp3"),
  };

  const effectsPlayer = useAudioPlayer(soundTypes.pressed);
  effectsPlayer.loop = false;
  effectsPlayer.volume = 0.3;

  const backgroundPlayer = useAudioPlayer(soundTypes.background);
  backgroundPlayer.loop = true;
  backgroundPlayer.volume = 0.25;


  const handleTurnOffMusic = ()=>{
    setMusicOn(false);
    backgroundPlayer.pause();
  };

  const handleTurnOnMusic = ()=>{
    setMusicOn(true);
    backgroundPlayer.play();
  };

  const handlePlaySoundEffect = (soundType:SoundType)=>{
    if(!sfxOn){
      // it will only play if sfxOn == true;
      return;
    };

    switch(soundType){
      case SoundType.pressed: 
        effectsPlayer.replace(soundTypes.pressed);
        break;
      case SoundType.succeed:
        effectsPlayer.replace(soundTypes.succeed);
        break;
      case SoundType.failed:
        effectsPlayer.replace(soundTypes.failed);
        break;
      default:
        effectsPlayer.replace(soundTypes.pressed);
        break;
    };
    effectsPlayer.seekTo(0);
    effectsPlayer.play();
    console.log("handlePlaySoundEffect executed!");
  };

  const handleTurnOffSfx = ()=>{
    setSfxOn(false);
  };

  const handleTurnOnSfx = ()=>{
    setSfxOn(true);
  };

  return (
    <SoundManagerContext 
      value={{
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
