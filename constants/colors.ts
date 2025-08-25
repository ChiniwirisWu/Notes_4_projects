import { NoteTaskState, NoteTaskListState } from "./types";

export function getStateColor(state:NoteTaskState){
  switch (state){
    case NoteTaskState.FILLED: return "#0be646";
    case NoteTaskState.EMPTY: return "#fced0f";
    case NoteTaskState.MARKED: return "#706260";
    default: return "#0be646";
  }
}

export function getMessageColor(state:NoteTaskListState) : string {
  switch(state){
    case NoteTaskListState.HIDDEN: return "#9534eb";
    case NoteTaskListState.EMPTY: return "#fced0f";
    default: return "#ccc";
  }
}
