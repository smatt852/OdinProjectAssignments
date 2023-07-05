#!/usr/bin/node
const arrayX = [9, 0, -3, 8.888, 20];

function mergeSort(arr) {
  if (arr.length === 1) return arr;
  const mid = Math.floor(arr.length / 2);
  let arr1 = arr.slice(0, mid);
  let arr2 = arr.slice(mid, arr.length);
  arr1 = mergeSort(arr1);
  arr2 = mergeSort(arr2);
  return merge(arr1, arr2);
}

function merge(arr1, arr2) {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else if (arr1[i] > arr2[j]) {
      result.push(arr2[j]);
      j++;
    }
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  return result;
}
console.log(mergeSort(arrayX));
