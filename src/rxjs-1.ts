// ReactiveX = Iterator + Observer
// RxJS ReactiveX => JS
// import { Observable, Observer } from 'rxjs';
//
// let count = 0;
// // const sequence$: Observable<any> = from([1, 2, 3, 4, 5]);
// const sequence$: Observable<number> = new Observable((obsever: Observer<number>) => {
//     //let interval: number;
//    // interval =
//         setInterval(() => {
//         obsever.next(count++);
//         // if (count === 5) {
//         //     obsever.complete();
//         //     clearInterval(interval);
//         // }
//     }, 1000);
// });
//
//
// sequence$.subscribe((value: number) => {
//     console.log('Sub 1', value);
// }, () => {
// }, () => {
//     console.log('Complete');
// });
//
// setTimeout(()=>{
//     sequence$.subscribe((value: number) => {
//         console.log('Sub 2', value);
//     }, () => {
//     }, () => {
//         console.log('Complete');
//     });
// }, 10000);
//

// import { fromEvent, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// const sequence$: Observable<MouseEvent> = fromEvent(document, 'click') as Observable<MouseEvent>;
//
// sequence$
//     .pipe(
//         // map((e: MouseEvent) => {
//         //     return e.clientX;
//         // })
//     )
//     .subscribe((x: number) => {
//         console.log('Sub 1', x);
//     });
//
// setTimeout(() => {
//     sequence$
//         .pipe(
//             // map((e: MouseEvent) => {
//             //     return e.clientX;
//             // })
//         )
//         .subscribe((x: number) => {
//             console.log('Sub 2', x);
//         });
// }, 10000);

// const sequance1$: Observable<number> = interval(1000);
//
// /*
//    ---0---1---2---3---
//       map((x)=>x*2)
//    ---0---2---4---6---
//  */
//
// const sequance2$: Observable<number> = sequance1$
//     .pipe(map(x => x * 2));
//
// sequance2$.subscribe(v => console.log(v));

// const sequance1$: Observable<number> = interval(1000);
//
// /*
//    ---0---1---2---3---
//       tap((x)=>x*9)
//    ---0---1---2---3---
//       map((x)=>x*2)
//    ---0---2---4---6---
//  */
//
// const sequance2$: Observable<number> = sequance1$
//     .pipe(
//         tap(x => console.log(x)),
//         map(x => x * 2)
//     );
//
// sequance2$.subscribe(_v => console.log());


// const sequance1$: Observable<number> = interval(1000);
//
// /*
//    ---0---1---2---3---4--
//       take(3)
//    ---0---1---2|
//       skip(2)
//    -----------2|
//  */
//
// const sequance2$: Observable<number> = sequance1$
//     .pipe(
//         take(1),
//         skip(2),
//     );
//
// sequance2$.subscribe(_v => console.log(_v));

//
// const sequance1$: Observable<number> = interval(1000).pipe(take(4));
// const sequance2$: Observable<number> = interval(1000).pipe(skip(6), take(3));
//
// /*
//  sequance1$  ---0---1---2---3|
//  sequance2$  -----------------------6---7---8|
//                   concat()
//  sequance3$  ---0---1---2---3-----------------6---7---8|
//  */
//
// const sequance3$: Observable<number> = concat<number>(sequance1$, sequance2$);
//
// sequance3$.subscribe(_v => console.log(_v));


import { fromEvent, Observable, zip } from "rxjs";
import { map } from "rxjs/operators";

const touchStart$: Observable<number> = getX(fromEvent(document, 'touchstart') as Observable<TouchEvent>);
const touchEnd$: Observable<number> = getX(fromEvent(document, 'touchend') as Observable<TouchEvent>);

function getX(source$: Observable<TouchEvent>): Observable<number> {
    return source$
        .pipe(
            map(({changedTouches}: TouchEvent) => changedTouches[0].clientX)
        );
}

function swipe(source$: Observable<[number, number]>) {
    return source$
        .pipe(
            map(([startX, endX]: [number, number]) => {
                return startX - endX;
            })
        );
}

const swipe$: Observable<number> = swipe(zip<[number, number]>(touchStart$, touchEnd$));

swipe$.subscribe((direction: number) => {
    if (direction > 0) {
        console.log('Swipe left');
        return;
    }
    console.log('Swipe right');
})
