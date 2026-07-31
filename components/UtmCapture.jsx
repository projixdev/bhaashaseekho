"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/utm";

// Invisible — mounted once in the root layout so utm_* params are captured
// from the URL no matter which page a visitor lands on first.
export default function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return null;
}
