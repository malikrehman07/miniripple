// src/redux/appReset.js
import { createAction } from "@reduxjs/toolkit";

/** Dispatch this to clear all per-user slices (profile, domains, etc.) */
export const resetAppState = createAction("app/reset");
