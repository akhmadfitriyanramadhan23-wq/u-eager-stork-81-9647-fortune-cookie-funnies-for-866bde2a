// Fortune Cookie Funnies for Engineers — make.fun entry
// Writes one fortune-cookie line for a software engineer to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set). Node 22+, stdlib only, deterministic.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune: a rule (deploy Friday), a literal violation (rollback fails),
// and a flat consequence (the pager learns your name). Specific, named,
// ends on the funniest word.
const FORTUNE =
  "Your lucky deploy window is Friday, 4:47 p.m. The build passes, the rollback fails, and your pager learns your name.";

const MAX_CHARS = 120;
const MIN_CHARS = 105; // target band: dense but tight, every word must earn its place

const text = FORTUNE.trim();
if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
  throw new Error(`fortune must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${text.length}`);
}
if (text.includes("\n")) {
  throw new Error("fortune must be a single line");
}
if (!/[.!?]$/.test(text)) {
  throw new Error("fortune must end on its punchline with terminal punctuation");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${text.length} chars to ${join(outDir, "entry.txt")}`);
