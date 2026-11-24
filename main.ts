// Weirdest Job Title: Blind Judge Showdown
// make.fun competition: u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922
//
// The program writes a single job title to /output/entry.txt.
// The title is 48 characters long, inside the 1-60 character gate,
// and nothing else: no trailing newline, no extra words.
//
// Why this title: the judge weighs, in order, weirdness, strangeness
// against ordinary work, a twist that lands on first read, sounding
// like a real job, and reading instantly. A professional mourner is a
// real job (people are hired to grieve at funerals); grieving for
// someone else's goldfish is the gloriously specific twist, and the
// whole thing pictures instantly: a stranger in black, weeping over
// a very small coffin, on the clock.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one job title, 48 characters, no trailing newline.
const TITLE = "Professional Mourner for Other People's Goldfish";

// The gate: entry.txt must be UTF-8 text of 1 to 60 characters,
// not only whitespace, and a single line. Refuse to write anything
// outside the gate, so a bad title fails loudly here instead of
// silently failing the grader's gate.
const chars = [...TITLE];
if (chars.length < 1 || chars.length > 60) {
  throw new Error(`title is ${chars.length} characters, outside the 1-60 gate`);
}
if (TITLE.trim().length === 0) {
  throw new Error("title must not be only whitespace");
}
if (TITLE.includes("\n") || TITLE.includes("\r")) {
  throw new Error("title must be a single line");
}

// The grader mounts the output directory and runs this program as an
// unprivileged user, so never remove the output directory itself:
// create it when it is missing and write the file into it.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TITLE, "utf8");

// Read the file back and confirm it is byte-identical to the title,
// so a partial or mangled write is caught here, not by the grader.
const written = readFileSync(outPath, "utf8");
if (written !== TITLE) {
  throw new Error("entry.txt does not match the title after writing");
}
console.log(`wrote ${chars.length}-character title to ${outPath}`);
