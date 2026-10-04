"use client";

/**
 * Tracks whether the visitor has made a client-side navigation yet.
 * The preloader only belongs to a hard load of `/`; once RouteWatcher sees
 * the pathname change, any later mount of the home page skips it.
 */
export const navState = { navigated: false };

export const INTRO_KEY = "gts-intro";
