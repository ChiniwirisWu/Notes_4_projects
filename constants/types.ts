export type Key = `${string}-${string}-${number}`;

export const enum NoteTaskListState {
  HIDDEN,
  SHOWN,
  EMPTY,
};

export const enum NoteTaskState {
  EMPTY,
  FILLED,
  MARKED
};

export type NoteTask = {
  key: Key,
  title:string,
  state:NoteTaskState,
};

export type NoteInfo = {
  key?: Key,
  title: string,
  description: string,
  functionalRequirements: NoteTask[], // JSON
  nonFunctionalRequirements: NoteTask[], // JSON
  score: number 
};

export type NoteInfoWithJSON = {
  key: Key,
  title: string,
  description: string,
  functionalRequirements: string, // JSON
  nonFunctionalRequirements: string, // JSON
  score:  number;
};

export enum Levels {
  common,
  uncommon,
  rare,
  epic,
  legendary,
};
