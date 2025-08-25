import { useState, createContext } from "react";
import { useAudioPlayer } from "expo-audio";

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
  bump, // 1
  click, // 2
  success, // 3
  fail, // 4
  open, // 5
  close, // 6
  last_item
};

export default function SoundManager({children}:{children:any}){
  const [musicOn, setMusicOn] = useState<boolean>(false);
  const [sfxOn, setSfxOn] = useState<boolean>(true);

  const soundTypes = {
    background: require("@/assets/Sfx/relaxing_piano_music.mp3"),
    bump: require("@/assets/Sfx/KEY_PRESS.wav"),
    click: require("@/assets/Sfx/CLICK.mp3"),
    success: require("@/assets/Sfx/SUCCESS.mp3"),
    fail: require("@/assets/Sfx/ERROR.wav"),
    open : require("@/assets/Sfx/OPEN_DIALOGUE.wav"),
    close : require("@/assets/Sfx/CLOSE_DIALOGUE.wav"),
  };

  const backgroundPlayer = useAudioPlayer(soundTypes.background);
  backgroundPlayer.loop = true;
  backgroundPlayer.volume = 0.25;

  const effectsPlayer = useAudioPlayer(soundTypes.bump);
  effectsPlayer.loop = false;
  effectsPlayer.volume = 0.3;

  const handleTurnOffMusic = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundType.bump);
    };
    setMusicOn(false);
    backgroundPlayer.pause();
  };

  const handleTurnOnMusic = ()=>{
    if(sfxOn){
      handlePlaySoundEffect(SoundType.bump);
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
      // opening a list, adding elements.
      case SoundType.bump: 
        effectsPlayer.replace(soundTypes.bump);
        break;
      // CRUD for notes.
      case SoundType.success:
        effectsPlayer.replace(soundTypes.success);
        break;
      // Backend errors.
      case SoundType.fail:
        effectsPlayer.replace(soundTypes.fail);
        break;
      // Message boxes
      case SoundType.open:
        effectsPlayer.replace(soundTypes.open);
        break;
      // Message boxes
      case SoundType.close:
        effectsPlayer.replace(soundTypes.close);
        break;
      // Marking a requirement as completed.
      case SoundType.click:
        effectsPlayer.replace(soundTypes.click);
        break;
      default:
        effectsPlayer.replace(soundTypes.bump);
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
      handlePlaySoundEffect(SoundType.bump);
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
