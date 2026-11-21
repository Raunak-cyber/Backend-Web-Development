/**
 * Node.js Runtime Features — Streams, Buffers & the File System
 *
 * GOAL
 * Move the SAME file two different ways and feel the difference:
 *   1) Load the whole file into memory with fs.readFile, and log its size.
 *   2) Flow the file through a stream and pipe it to a writable stream (a copy).
 * Then explain, in your own words, why the stream approach is preferable for
 * large files.
 *
 * The starter already imports `fs` and `path` for you and points at a large
 * sample file (`sample-data.txt`) that lives next to this script.
 *
 * Run it with:  npm start
 */

const fs = require('fs');
const path = require('path');

// Absolute, OS-safe path to the sample file (do NOT hand-build paths with '+').
const INPUT = path.join(__dirname, 'sample-data.txt');
const OUTPUT = path.join(__dirname, 'sample-copy.txt');

// ── PART 1: read the whole file into memory, then log its size ──────────────
function readWholeFile() {
  fs.readFile(INPUT, (error, data) => {
    if (error) {
      console.error('readFile: failed to load file:', error);
      return;
    }

    // No encoding was supplied, so data is a Buffer containing raw bytes.
    console.log(`readFile: loaded ${data.length} bytes into memory at once`);
  });
}

// ── PART 2: stream the file and pipe it to a writable stream ────────────────
function streamFile() {
  const readable = fs.createReadStream(INPUT);
  const writable = fs.createWriteStream(OUTPUT);

  writable.on('finish', () => {
    console.log('stream: finished copying via 64KB chunks (peak memory stays flat)');
  });

  readable.on('error', (error) => {
    console.error('stream: failed to read input file:', error);
    writable.destroy();
  });

  writable.on('error', (error) => {
    console.error('stream: failed to write output file:', error);
  });

  readable.pipe(writable);
}

// ── PART 3: explain the difference ──────────────────────────────────────────
// fs.readFile loads the entire file into one Buffer, so the memory it uses
// grows with the file's full size. A stream handles the file in small chunks,
// keeping only a limited amount of data in memory at a time, so peak memory
// stays roughly flat even as the file gets much larger.

// Run both approaches.
readWholeFile();
streamFile();

module.exports = { readWholeFile, streamFile, INPUT, OUTPUT };
