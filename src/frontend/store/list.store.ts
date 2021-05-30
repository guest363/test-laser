import { writable } from "svelte/store";

const initialState = [];

export const list = writable(initialState);
