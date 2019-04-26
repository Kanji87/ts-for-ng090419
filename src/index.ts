// const sequence1$ = interval(1000).pipe(take(4));
//
// const sequence2$ = sequence1$.pipe(
//     switchMap(_x => of(1, 2)),
// )
//
// sequence2$.subscribe(x => {
//     console.log(x)
// });


// const sequence1$ = fromEvent(document, 'click');
//
// function request() {
//     return fetch('https://jsonplaceholder.typicode.com/users/1')
//         .then(res => res.json());
// }
//
// const sequence2$ = sequence1$
//     .pipe(switchMap(_click => request()));
//
// sequence2$.subscribe(v => console.log(v));


//  Observable + Observer = Subject

// import { BehaviorSubject, Subject } from "rxjs";
//
// const sequence$$: Subject<number> = new BehaviorSubject(0);
//
// const subscription = sequence$$.subscribe(v => console.log(v),()=>{}, ()=>{
//     console.log('Complete')
// });
// setTimeout(()=>{
//     subscription.unsubscribe();
//     sequence$$.subscribe(v => console.log('Sub', v),()=>{}, ()=>{
//         console.log('Complete')
//     });
// }, 7000);
// sequence$$.next(3);
// sequence$$.next(4);
// sequence$$.next(5);

// import './render-result';
// import './list-of-items';


// import { ReplaySubject, Subject } from "rxjs";
//
// const sequence$$: Subject<number> = new ReplaySubject(undefined, 9000);
// sequence$$.next(3);
// sequence$$.next(4);
// sequence$$.next(5);
//
//
//
// sequence$$.subscribe(v => console.log('Sub 1', v), () => {
// }, () => {
//     console.log('Complete')
// });
// setTimeout(() => {
//     sequence$$.subscribe(v => console.log('Sub 2', v), () => {
//     }, () => {
//         console.log('Complete')
//     });
// }, 7000);
//
//
// setTimeout(() => {
//     console.log('complete Async Subject');
//     sequence$$.complete()
// }, 10000);
//
// setTimeout(() => {
//     sequence$$.subscribe(v => console.log('Sub 3', v), () => {
//     }, () => {
//         console.log('Complete')
//     });
// }, 14000);


// import { fromEvent, Subject } from "rxjs";
// import { takeUntil } from "rxjs/operators";
//
// const controlSequence$$: Subject<null> = new Subject()
//
// const subscription1;
// const subscription2;
// const subscription3;
//
//
// subscription1 = fromEvent(document, 'click')
//     .pipe(takeUntil(controlSequence$$))
//     .subscribe(v => console.log(v))
// subscription2 = fromEvent(document, 'click')
//     .pipe(takeUntil(controlSequence$$))
//     .subscribe(v => console.log(v))
// subscription3 = fromEvent(document, 'click')
//     .pipe(takeUntil(controlSequence$$))
//     .subscribe(v => console.log(v))
//
//
// ngOnDestroy(){
//     controlSequence$$.next(null);
//     controlSequence$$.complete();
// }


import { empty, interval, Observable, of, zip } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

const sequence1$ = interval(500);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');

zip(sequence1$, sequence2$)
    .pipe(
        switchMap(([_x, y]) => {
            return of(null)
                .pipe(
                    map(() => {
                        return (y as any).toUpperCase();
                    }),
                    //retry(3),
                    // retryWhen((obs) => obs.pipe(delay(4000))),
                    catchError((err, _obs) => {
                        console.log('From CatchErr', err);
                        return empty();
                    })
                );
        })
    )
    .subscribe(x => {
        console.log(x)
    }, (err) => {
        console.log('From err CB', err)
    }, () => {
        console.log('Complete')
    })
