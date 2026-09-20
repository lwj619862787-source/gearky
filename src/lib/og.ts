interface CoverOptions {
  title: string;
  categoryLabel?: string;
  typeLabel?: string;
  keyword?: string;
  width?: number;
  height?: number;
}

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

function wrapTitle(title: string, maxChars: number, maxLines: number): string[] {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
    if (lines.length === maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line);

  return lines.length ? lines : [''];
}

export function generateCoverSvg(opts: CoverOptions): string {
  const width = opts.width ?? 1200;
  const height = opts.height ?? 630;
  const title = opts.title || 'Gearky';

  const lines = wrapTitle(title, 30, 3);
  const lineCount = lines.length;
  const fontSize = lineCount >= 3 ? 50 : lineCount === 2 ? 60 : 68;
  const lineHeight = Math.round(fontSize * 1.25);

  const badges: string[] = [];
  if (opts.typeLabel) badges.push(opts.typeLabel);
  if (opts.categoryLabel) badges.push(opts.categoryLabel);

  let badgeSvg = '';
  if (badges.length) {
    badgeSvg = badges
      .map((label, i) => {
        const text = escapeXml(label.toUpperCase());
        const w = text.length * 14 + 52;
        const x = 80 + i * (w + 16);
        return (
          '<g>' +
          `<rect x="${x}" y="252" width="${w}" height="44" rx="22" fill="#132447" stroke="#2a4f9e"/>` +
          `<text x="${x + w / 2}" y="281" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="600" fill="#8fb3ff" text-anchor="middle">${text}</text>` +
          '</g>'
        );
      })
      .join('');
  }

  const firstLineY = badges.length ? 356 : 330;

  const titleSvg = lines
    .map((line, i) => {
      const y = firstLineY + i * lineHeight;
      return `<text x="80" y="${y}" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" font-weight="800" fill="#ffffff">${escapeXml(line)}</text>`;
    })
    .join('');

  const footerText = escapeXml(opts.keyword || 'PlayStation gear, storage & console guides');
  const footerY = height - 52;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="g" cx="82%" cy="0%" r="95%">
      <stop offset="0%" stop-color="#155eef" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0b1220" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0e1a30"/>
      <stop offset="100%" stop-color="#0b1220"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#edge)"/>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <g transform="translate(80, 84)">
    <rect x="0" y="0" width="76" height="76" rx="18" fill="#155eef"/>
    <text x="38" y="53" font-family="Inter, Arial, sans-serif" font-size="48" font-weight="800" fill="#ffffff" text-anchor="middle">G</text>
    <text x="96" y="53" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="800" fill="#ffffff">gearky</text>
  </g>
  ${badgeSvg}
  ${titleSvg}
  <text x="80" y="${footerY}" font-family="Inter, Arial, sans-serif" font-size="24" fill="#98a2b3">${footerText}</text>
</svg>`;
}
