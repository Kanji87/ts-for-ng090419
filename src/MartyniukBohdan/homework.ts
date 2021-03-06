
/**
 * task 1
 */

function isInArray( arr: unknown[], ...args: unknown[]): boolean {
    for ( let i = 0; i < args.length; i++) {
        const value = args[i];
        if (arr.indexOf(value) !== -1) {
            return true;
        }
    }
    return false;
}


// console.log(isInArray([2,3,4], "s"))


/**
 * task 2
 */


type sn = number | string;

function summator(...args: sn[]): sn {
    return args.reduce((s: number, num: sn) => {
        if ( typeof num   === 'number') {
            return s + num;
        } else {
            return s + parseInt(num);
        }
    }, 0);
}


// summator(3, 2, '3');


/**
 * task 3
 */


function getUnique(...args: unknown[]): unknown {
    return [...args];
}

// getUnique(2, 3, 'ok', true);

/**
 * task 4
 */




function toMatrix(data: unknown[], rowSize: number) {
    const newArr: unknown[] = [];


    data.reduce((arr: unknown[], next: any, index: number): unknown[] => {

        const dataLength = data.length - 1


        if (arr.length === rowSize) {
            newArr.push(arr);
            arr = [];
        }

        if (index === dataLength) {
            newArr.push(arr);
        }

        arr.push(next);
        return arr;
    }, []);

    return newArr;

}
//console.log(toMatrix([3, 2, 3 ], 2))
