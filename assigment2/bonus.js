/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
    let ans = [];
    let n = arr.length;
  
    for (let num = 1; num < arr[0]; num++) {
      ans.push(num);
      if (ans.length === k) return ans[k-1];
    }
  
    for (let i = 1; i < n; i++) {
      for (let num = arr[i-1] + 1; num < arr[i]; num++) {
        ans.push(num);
        if (ans.length === k) return ans[k-1];
      }
    }
  
    let num = arr[n-1] + 1;
    while (ans.length < k) {
      ans.push(num++);
    }
  
    return ans[k-1];
  };
  