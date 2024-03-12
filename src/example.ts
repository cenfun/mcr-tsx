type Point = {
    x: number;
    y: number
}

const foo = function(p:Point) {
    if(p) {
        return p;
    }
    
    return null;
}

const bar = function() {
    const p:Point = {
        x:1,
        y:2
    }
    
    console.log(p);
}

export {
    foo,
    bar 
}