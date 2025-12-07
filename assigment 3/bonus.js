var majorityElement = function(nums) {
    let freq = {};

    for (let i = 0; i < nums.length; i++) {
        let x = nums[i];
        if (freq[x] == undefined) {
            freq[x] = 0;
        }
        freq[x]++;
        
    }

    // console.log(freq);
    // console.log(freq[1])

    let cnt = -Number.MAX_VALUE;
    let max = null;

    for (let i in freq) {
        if (freq[i] > cnt) {
            cnt = freq[i];
            max = i;
        }
    }

    return Number(max);
};

nums = [2,2,1,1,1,2,2];
console.log(majorityElement(nums)); 
