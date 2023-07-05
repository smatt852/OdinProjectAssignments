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

// function mergeSort(array) {
//   if (array.length === 1) return array;

//   // If array is bigger than 1, cut it in two
//   const mid = Math.floor(array.length / 2);
//   let left = array.slice(0, mid);
//   let right = array.slice(mid, array.length);

//   // Step 1: Sort the left side array
//   left = mergeSort(left);

//   // Step 2: Sort the right side array
//   right = mergeSort(right);

//   // Step 3: Merge
//   return merge(left, right);
// }

// function merge(left, right) {
//   const merged = [];

//   while (left.length > 0 && right.length > 0) {
//     if (left[0] < right[0]) {
//       // add left to the merged array
//       merged.push(left[0]);
//       // remove left[0] from left
//       left.shift();
//     } else {
//       // add right to the merged array
//       merged.push(right[0]);
//       // remove right[0] from right
//       right.shift();
//     }
//   }

//   // if any remaining elements, (ie they're larger than last element
//   // of the merged array), add to merged array
//   while (right.length > 0) {
//     merged.push(right[0]);
//     right.shift();
//   }

//   while (left.length > 0) {
//     merged.push(left[0]);
//     left.shift();
//   }

//   return merged;
// }
