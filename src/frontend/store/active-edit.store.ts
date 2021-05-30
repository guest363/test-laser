import { writable } from "svelte/store";

const initialState = "";

export const activeEdit = writable(initialState);
