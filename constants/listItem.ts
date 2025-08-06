// types and enums
export const enum ItemStates {
  empty,
  filled,
  marked,
};

export const enum MessageStates {
  hidden,
  shown,
  filled,
  empty,
};

export type Key = `${string}-${string}-${number}`;

export type Item = {
  key: (Key | undefined),
  title:String,
  state:ItemStates,
};

// method's 
export function getStateColor(state:ItemStates){
  switch (state){
    case ItemStates.filled: return "#fced0f";
    case ItemStates.empty: return "#706260";
    case ItemStates.marked: return "#0be646";
    default: return "#0be646";
  }
}

export function getMessageColor(state:MessageStates) : String {
  switch(state){
    case MessageStates.hidden: return "#9534eb";
    case MessageStates.empty: return "#fced0f";
    default: return "#ccc";
  }
}

export function getMessage(state : MessageStates) : (String | null){
  switch(state){
    case MessageStates.empty: return "This list is empty";
    case MessageStates.hidden: return "List is hidden";
    default: return null;
  } 
}
