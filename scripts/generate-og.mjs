// Gera public/og.png (1200x630) a partir da cor da marca, para Open Graph / Twitter Card.
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '..', 'public', 'og.png');

const W = 1200;
const H = 630;
const bg = [15, 110, 102]; // --accent-primary
const band = [217, 122, 63]; // --accent-warm, faixa inferior representando o CTA

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xff;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

const raw = Buffer.alloc((W * 3 + 1) * H);
let offset = 0;
const bandStart = Math.floor(H * 0.86);
for (let y = 0; y < H; y++) {
  raw[offset++] = 0;
  const inBand = y >= bandStart;
  const [r, g, b] = inBand ? band : bg;
  for (let x = 0; x < W; x++) {
    raw[offset++] = r;
    raw[offset++] = g;
    raw[offset++] = b;
  }
}
const compressed = zlib.deflateSync(raw);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;
ihdr[9] = 2;
const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const png = Buffer.concat([
  signature,
  chunk('IHDR', ihdr),
  chunk('IDAT', compressed),
  chunk('IEND', Buffer.alloc(0)),
]);
fs.writeFileSync(outPath, png);
console.log('og.png gerado em public/og.png (1200x630)');

// apple-touch-icon.png (180x180, cor sólida da marca)
function solidSquare(size, [r, g, b]) {
  const raw2 = Buffer.alloc((size * 3 + 1) * size);
  let off = 0;
  for (let y = 0; y < size; y++) {
    raw2[off++] = 0;
    for (let x = 0; x < size; x++) {
      raw2[off++] = r;
      raw2[off++] = g;
      raw2[off++] = b;
    }
  }
  const comp = zlib.deflateSync(raw2);
  const ihdr2 = Buffer.alloc(13);
  ihdr2.writeUInt32BE(size, 0);
  ihdr2.writeUInt32BE(size, 4);
  ihdr2[8] = 8;
  ihdr2[9] = 2;
  return Buffer.concat([signature, chunk('IHDR', ihdr2), chunk('IDAT', comp), chunk('IEND', Buffer.alloc(0))]);
}
const iconPath = path.resolve(__dirname, '..', 'public', 'apple-touch-icon.png');
fs.writeFileSync(iconPath, solidSquare(180, bg));
console.log('apple-touch-icon.png gerado em public/apple-touch-icon.png (180x180)');
