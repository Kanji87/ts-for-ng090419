import { currentItem$$ } from "./service";

const ul = document.querySelector('ul') as HTMLUListElement;
currentItem$$.next('Angular');
ul.addEventListener('click', (event: MouseEvent) => {
    const el = event.target as HTMLElement;
    if (el.tagName === 'LI') {
        currentItem$$.next(el.innerHTML);
    }
})
