import { BehaviorSubject } from "rxjs";
import { storage } from "../../storage";

export const tokenSubject$ = new BehaviorSubject("");
export const userSubject$ = new BehaviorSubject();

storage.get("token").then((token) => {
  if (token) {
    tokenSubject$.next(token);
  }

  tokenSubject$.subscribe((token) => {
    storage.set("token", token);
  });
});

storage.get("user").then((user) => {
  if (user) {
    userSubject$.next(user);
  }

  userSubject$.subscribe((user) => {
    storage.set("user", user);
  });
});
