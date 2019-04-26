import { BehaviorSubject, Subject } from "rxjs";

export const currentItem$$: Subject<string> = new BehaviorSubject('');
