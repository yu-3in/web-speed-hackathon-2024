function kanaToHira(str: string) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    const chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

export function normalizeString(str: string): string {
  // Unicode NFKC正規化で全角・半角を統一し、大文字に統一する
  return kanaToHira(str).normalize('NFKC').toUpperCase();
}
