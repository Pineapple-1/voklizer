import { BehaviorSubject } from "rxjs";
import { storage } from "../../storage";

export const tokenSubject$ = new BehaviorSubject(null); // Start with null instead of empty string
export const userSubject$ = new BehaviorSubject();

tokenSubject$.subscribe((token) => {
  if (token) {
    storage.set("token", token);
  }
});

userSubject$.subscribe((user) => {
  if (user) {
    storage.set("user", user);
  }
});

const initializeFromStorage = async () => {
  try {
    const [token, user] = await Promise.all([
      storage.get("token"),
      storage.get("user")
    ]);

    if (token) {
      tokenSubject$.next(token);
    }

    if (user) {
      userSubject$.next(user);
    }
  } catch (error) {
    console.error("Error initializing from storage:", error);
  }
};

initializeFromStorage();