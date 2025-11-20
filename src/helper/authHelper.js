// src/helper/authHelper.js
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

/** Wait for a signed-in user from the initialized auth instance */
export async function ensureUser() {
  if (auth.currentUser) return auth.currentUser;
  return await new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        unsub();
        if (u) resolve(u);
        else reject(new Error("User not authenticated"));
      },
      (err) => {
        unsub();
        reject(err || new Error("Auth listener failed"));
      }
    );
  });
}

/** Get an ID token (forceRefresh will fetch new claims if needed) */
export async function getIdTokenSafe(forceRefresh = false) {
  const user = await ensureUser();
  return await user.getIdToken(forceRefresh);
}

/** Tiny helper */
export const delay = (ms) => new Promise((r) => setTimeout(r, ms));
