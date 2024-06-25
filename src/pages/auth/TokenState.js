import { BehaviorSubject } from "rxjs";

import { storage } from "../../storage";

export const tokenSubject$ = new BehaviorSubject("");

storage.get("token").then((token) => {
  if (token) {
    tokenSubject$.next(token);
  }

  tokenSubject$.subscribe((token) => {
    storage.set("token", token);
  });
});
