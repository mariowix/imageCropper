module.exports = (data, minTop, maxTop, minBottom, maxBottom, direction, callback) => {
    let min = 0, shouldBreak = false;

    const condition = (i) => {
        if (direction > 0)  return i < maxTop;
        
        return i > maxTop;
    }

    const step = (i) => {
        if (direction > 0)  return i+1;

        return i-1;
    }
 
    for(let i = minTop; condition(i); i=step(i)) {
        for(let j = minBottom; j < maxBottom; j++) {
            const index = callback(i, j);

            if (data[index] > 0) {
                min = i;
                shouldBreak = true;
                break;
            }
        }
        
        if (shouldBreak) break;
    }

    return min;
}