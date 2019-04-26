import { currentItem$$ } from "./service";

setTimeout(() => {
    const div: HTMLDivElement = document.querySelector('div') as HTMLDivElement;

    currentItem$$.subscribe((v: string) => {
        div.innerText = v;
    })

}, 3000);

