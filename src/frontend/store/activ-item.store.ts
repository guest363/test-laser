import { writable } from "svelte/store";

const initialState = "";

export const activeItem = writable(initialState);
