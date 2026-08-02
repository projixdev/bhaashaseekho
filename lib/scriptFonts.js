import { Noto_Sans_Kannada, Noto_Sans_Devanagari, Noto_Sans_Telugu } from "next/font/google";

// Shared instances so CourseThumbnail and CourseHero render the same native
// script glyphs without each loading its own copy of these fonts.
const notoKannada = Noto_Sans_Kannada({ subsets: ["kannada"], weight: "700" });
const notoDevanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: "700" });
const notoTelugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: "700" });

export const SCRIPT_FONTS = {
  kannada: notoKannada.className,
  hindi: notoDevanagari.className,
  telugu: notoTelugu.className,
};
