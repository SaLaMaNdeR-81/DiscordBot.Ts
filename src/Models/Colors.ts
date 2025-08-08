// ColorLog.ts
const colorMap: Record<string, string> = {
  // Minecraft color codes (based on closest ANSI match)
  '&0': '\x1b[30m', // Black
  '&1': '\x1b[34m', // Dark Blue
  '&2': '\x1b[32m', // Dark Green
  '&3': '\x1b[36m', // Dark Aqua (Cyan)
  '&4': '\x1b[31m', // Dark Red
  '&5': '\x1b[35m', // Dark Purple (Magenta)
  '&6': '\x1b[33m', // Gold (Yellow)
  '&7': '\x1b[37m', // Gray
  '&8': '\x1b[90m', // Dark Gray
  '&9': '\x1b[94m', // Blue
  '&a': '\x1b[92m', // Green
  '&b': '\x1b[96m', // Aqua
  '&c': '\x1b[91m', // Red
  '&d': '\x1b[95m', // Light Purple
  '&e': '\x1b[93m', // Yellow
  '&f': '\x1b[97m', // White

  // Formatting
  '&l': '\x1b[1m',  // Bold
  '&n': '\x1b[4m',  // Underline
  '&o': '\x1b[3m',  // Italic
  '&m': '\x1b[9m',  // Strikethrough
  '&r': '\x1b[0m',  // Reset
};

export function ColorLog(message: string): void {
  const formatted = message.replace(/&[0-9a-frlomn]/gi, (match) => {
    const code = match.toLowerCase();
    return colorMap[code] || match;
  }) + '\x1b[0m'; // Ensure reset at end
  console.log(formatted);
}
