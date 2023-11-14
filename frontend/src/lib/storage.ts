"use client";
import localforage from "localforage";

localforage.config({
  driver: localforage.INDEXEDDB,
  name: "STORAGE-DB",
  version: 4,
});

export const setItem = localforage.setItem;
export const getItem = localforage.getItem;
export const deleteItem = localforage.removeItem;
export const resatItem = localforage.clear;
