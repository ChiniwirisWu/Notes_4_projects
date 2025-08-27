import { SoundType } from "@/components/Shared/SoundManager";
import { ScrollView } from "react-native-gesture-handler";
import { scrollToTop } from "@/constants/functions";

export enum MessageType {
  CREATED,
  NOT_CREATED,
  UPDATED,
  NOT_UPDATED,
  EMPTY,
  HIDEN,
  DATABASE_INITIALIZED,
  DATABASE_NOT_LOADED,
  QUERY_SUCCESS,
  QUERY_FAILED,
  ALL_ITEMS_FETCHED,
  SETTINGS_LOADED,
  NONE,
};

export function getMessage(messageType:MessageType) : string{
  switch(messageType){
    case MessageType.CREATED: return "Note created succesfully!🥳";
    case MessageType.NOT_CREATED: return "There was a problem creating this note. Hint: try with another title ⚠️";
    case MessageType.UPDATED: return "Fields saved! 🥳 ";
    case MessageType.NOT_UPDATED: return "There was a problem updating this note. ⚠️";
    case MessageType.EMPTY: return "This list is empty";
    case MessageType.HIDEN: return "List is hidden";
    case MessageType.DATABASE_INITIALIZED: return "Database initialized  ✅";
    case MessageType.DATABASE_NOT_LOADED: return "Setting.tsx Database is not loaded yet ⚠️";
    case MessageType.QUERY_SUCCESS: return "Query success  ✅";
    case MessageType.QUERY_FAILED: return "Query failed it's execution ❌";
    case MessageType.ALL_ITEMS_FETCHED: return "All Notes fetched  ✅";
    case MessageType.SETTINGS_LOADED: return "Settings loaded  ✅";
    case MessageType.NONE: return "";
    
    default: return "";
  }
};











