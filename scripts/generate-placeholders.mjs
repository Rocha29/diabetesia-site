// Gera placeholders PNG 390x844 para as screenshots da V2 (serão substituídas pelo orquestrador).
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'src', 'assets', 'screens');
fs.mkdirSync(outDir, { recursive: true });

const W = 390;
const H = 844;

const screens = [
  { name: 'login', color: [15, 110, 102] },
  { name: 'home', color: [47, 143, 91] },
  { name: 'glucose', color: [201, 122, 31] },
  { name: 'food', color: [217, 122, 63] },
  { name: 'medication', color: [47, 127, 209] },
  { name: 'prescription', color: [10, 79, 73] },
  { name: 'chat', color: [95, 94, 189] },
  { name: 'report', color: [194, 59, 59] },
  { name: 'tracking', color: [22, 33, 31] },
  { name: 'profile', color: [148, 153, 143] },
  { name: 'checkin', color: [111, 150, 90] },
];

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

function textPixels(label) {
  // bitmap de dígitos/letras simplificado não é viável aqui; usamos apenas bloco de cor + barra central.
  return label;
}

function makePng(name, [r, g, b]) {
  const raw = Buffer.alloc((W * 3 + 1) * H);
  let offset = 0;
  // Faixa central mais clara para simular "texto" (nome da tela) sem precisar de fonte bitmap.
  const stripeStart = Math.floor(H * 0.46);
  const stripeEnd = Math.floor(H * 0.54);
  for (let y = 0; y < H; y++) {
    raw[offset++] = 0; // filter: none
    const inStripe = y >= stripeStart && y <= stripeEnd;
    for (let x = 0; x < W; x++) {
      if (inStripe) {
        raw[offset++] = Math.min(255, r + 60);
        raw[offset++] = Math.min(255, g + 60);
        raw[offset++] = Math.min(255, b + 60);
      } else {
        raw[offset++] = r;
        raw[offset++] = g;
        raw[offset++] = b;
      }
    }
  }
  const compressed = zlib.deflateSync(raw);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type RGB
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const png = Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);

  fs.writeFileSync(path.join(outDir, `${name}.png`), png);
  // Placeholder temporário: não há encoder WebP sem dependências nativas.
  // Copiamos o PNG como .webp só para o arquivo existir com o nome esperado;
  // o navegador rejeita o source webp inválido e usa o <img> PNG como fallback automaticamente.
  fs.copyFileSync(path.join(outDir, `${name}.png`), path.join(outDir, `${name}.webp`));
}

for (const s of screens) {
  makePng(s.name, s.color);
  console.log(`placeholder gerado: ${s.name}.png (${textPixels(s.name)})`);
}

console.log('Placeholders gerados em src/assets/screens. Serão substituídos pelas screenshots reais da V2.');
