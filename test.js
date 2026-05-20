#!/usr/bin/env node

const COMMANDS = {
  file: [
    { cmd: "ls",      usage: "ls [options] [dir]",     desc: "List directory contents" },
    { cmd: "cp",      usage: "cp [src] [dest]",        desc: "Copy files" },
    { cmd: "mv",      usage: "mv [src] [dest]",        desc: "Move or rename files" },
    { cmd: "rm",      usage: "rm [options] [file]",    desc: "Remove files" },
    { cmd: "mkdir",   usage: "mkdir [dirname]",        desc: "Create directory" },
    { cmd: "touch",   usage: "touch [filename]",       desc: "Create empty file" },
    { cmd: "cat",     usage: "cat [file]",             desc: "Display file contents" },
    { cmd: "chmod",   usage: "chmod [mode] [file]",   desc: "Change file permissions" },
    { cmd: "find",    usage: "find [path] [expr]",     desc: "Search for files" },
    { cmd: "pwd",     usage: "pwd",                    desc: "Print working directory" },
  ],
  network: [
    { cmd: "ping",      usage: "ping [host]",          desc: "Test network connectivity" },
    { cmd: "curl",      usage: "curl [url]",           desc: "Transfer data from URLs" },
    { cmd: "wget",      usage: "wget [url]",           desc: "Download files" },
    { cmd: "ssh",       usage: "ssh [user@host]",      desc: "Secure shell connection" },
    { cmd: "scp",       usage: "scp [src] [dest]",     desc: "Secure copy over SSH" },
    { cmd: "netstat",   usage: "netstat [options]",    desc: "Network statistics" },
    { cmd: "ifconfig",  usage: "ifconfig",             desc: "Network interface config" },
    { cmd: "dig",       usage: "dig [domain]",         desc: "DNS lookup utility" },
  ],
  process: [
    { cmd: "ps",      usage: "ps [options]",           desc: "Show running processes" },
    { cmd: "top",     usage: "top",                    desc: "Live process monitor" },
    { cmd: "kill",    usage: "kill [pid]",             desc: "Terminate a process" },
    { cmd: "htop",    usage: "htop",                   desc: "Interactive process viewer" },
    { cmd: "jobs",    usage: "jobs",                   desc: "List background jobs" },
    { cmd: "bg",      usage: "bg [job]",               desc: "Run in background" },
    { cmd: "fg",      usage: "fg [job]",               desc: "Bring to foreground" },
  ],
  system: [
    { cmd: "uname",   usage: "uname [options]",        desc: "Show system information" },
    { cmd: "df",      usage: "df [options]",           desc: "Disk space usage" },
    { cmd: "free",    usage: "free [options]",         desc: "Memory usage" },
    { cmd: "uptime",  usage: "uptime",                 desc: "System uptime" },
    { cmd: "whoami",  usage: "whoami",                 desc: "Print current user" },
    { cmd: "date",    usage: "date",                   desc: "Display date and time" },
    { cmd: "history", usage: "history",                desc: "Show command history" },
    { cmd: "reboot",  usage: "reboot",                 desc: "Restart the system" },
  ],
  text: [
    { cmd: "grep",    usage: "grep [pattern] [file]",  desc: "Search text patterns" },
    { cmd: "awk",     usage: "awk '[pattern]' [file]", desc: "Text processing tool" },
    { cmd: "sed",     usage: "sed '[expr]' [file]",    desc: "Stream editor" },
    { cmd: "sort",    usage: "sort [file]",            desc: "Sort lines of text" },
    { cmd: "wc",      usage: "wc [file]",              desc: "Word/line/char count" },
    { cmd: "head",    usage: "head -n [num] [file]",   desc: "Show first lines" },
    { cmd: "tail",    usage: "tail -n [num] [file]",   desc: "Show last lines" },
    { cmd: "diff",    usage: "diff [file1] [file2]",   desc: "Compare two files" },
  ],
};

// ── ANSI Colors (no dependencies) ─────────────────────────────────────────
const C = {
  reset:   "\x1b[0m",
  bold:    "\x1b[1m",
  cyan:    "\x1b[36m",
  yellow:  "\x1b[33m",
  green:   "\x1b[32m",
  red:     "\x1b[31m",
  blue:    "\x1b[34m",
  magenta: "\x1b[35m",
  gray:    "\x1b[90m",
  white:   "\x1b[97m",
};

const CAT_COLORS = {
  file:    C.yellow,
  network: C.blue,
  process: C.red,
  system:  C.green,
  text:    C.magenta,
};

function color(text, ...codes) {
  return codes.join("") + text + C.reset;
}

// ── Banner ─────────────────────────────────────────────────────────────────
function showBanner() {
  console.log(color("\n  ██████╗ ██╗███████╗██████╗ ██╗      █████╗ ██╗   ██╗", C.green, C.bold));
  console.log(color("  ██╔══██╗██║██╔════╝██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝", C.green, C.bold));
  console.log(color("  ██║  ██║██║███████╗██████╔╝██║     ███████║ ╚████╔╝ ", C.green, C.bold));
  console.log(color("  ██║  ██║██║╚════██║██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ", C.cyan, C.bold));
  console.log(color("  ██████╔╝██║███████║██║     ███████╗██║  ██║   ██║   ", C.cyan, C.bold));
  console.log(color("  ╚═════╝ ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝  ", C.cyan, C.bold));
  console.log(color("           CMD — Linux Command Reference\n", C.gray));
}

// ── Table Printer ──────────────────────────────────────────────────────────
function printTable(catName, cmds) {
  const catColor = CAT_COLORS[catName] || C.white;

  console.log(color(`\n  ● ${catName.toUpperCase()} COMMANDS`, catColor, C.bold));
  console.log(color("  " + "─".repeat(72), C.gray));
  console.log(
    color("  " + "COMMAND".padEnd(14), C.bold, C.white) +
    color("USAGE".padEnd(28), C.bold, C.white) +
    color("DESCRIPTION", C.bold, C.white)
  );
  console.log(color("  " + "─".repeat(72), C.gray));

  cmds.forEach(({ cmd, usage, desc }) => {
    console.log(
      color("  " + cmd.padEnd(14), catColor, C.bold) +
      color(usage.padEnd(28), C.gray) +
      color(desc, C.white)
    );
  });

  console.log(color("  " + "─".repeat(72), C.gray));
}

// ── Stats ──────────────────────────────────────────────────────────────────
function printStats() {
  const total = Object.values(COMMANDS).reduce((s, c) => s + c.length, 0);
  const cats  = Object.keys(COMMANDS).length;
  console.log(color(`\n  📊 ${total} commands across ${cats} categories\n`, C.gray));
}

// ── Help ───────────────────────────────────────────────────────────────────
function showHelp() {
  showBanner();
  console.log(color("  USAGE:\n", C.bold, C.white));
  console.log(`  ${color("display-cmd --all", C.cyan)}              Show all commands`);
  console.log(`  ${color("display-cmd --category file", C.cyan)}    Show commands by category`);
  console.log(`  ${color("display-cmd --search grep", C.cyan)}      Search a command`);
  console.log(`  ${color("display-cmd --list", C.cyan)}             List all categories`);
  console.log(`  ${color("display-cmd --help", C.cyan)}             Show this help\n`);
}

// ── Argument Parser ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flag = args[0];
const val  = args[1];

if (!flag || flag === "--help" || flag === "-h") {
  showHelp();

} else if (flag === "--all" || flag === "-a") {
  showBanner();
  Object.entries(COMMANDS).forEach(([cat, cmds]) => printTable(cat, cmds));
  printStats();

} else if (flag === "--category" || flag === "-c") {
  if (!val) {
    console.log(color("\n  ❌ Provide a category name.\n", C.red));
    console.log(`  Available: ${Object.keys(COMMANDS).join(", ")}\n`);
  } else if (!COMMANDS[val]) {
    console.log(color(`\n  ❌ Category "${val}" not found.\n`, C.red));
    console.log(`  Available: ${Object.keys(COMMANDS).join(", ")}\n`);
  } else {
    showBanner();
    printTable(val, COMMANDS[val]);
    console.log();
  }

} else if (flag === "--search" || flag === "-s") {
  if (!val) {
    console.log(color("\n  ❌ Provide a search keyword.\n", C.red));
  } else {
    const keyword = val.toLowerCase();
    const results = [];
    Object.entries(COMMANDS).forEach(([cat, cmds]) => {
      cmds.forEach(({ cmd, usage, desc }) => {
        if (cmd.includes(keyword) || desc.toLowerCase().includes(keyword)) {
          results.push({ cat, cmd, usage, desc });
        }
      });
    });

    showBanner();
    if (!results.length) {
      console.log(color(`\n  ❌ No results for "${val}"\n`, C.red));
    } else {
      console.log(color(`\n  🔍 Results for "${val}":\n`, C.green, C.bold));
      console.log(color("  " + "─".repeat(72), C.gray));
      console.log(
        color("  " + "CAT".padEnd(12),     C.bold, C.white) +
        color("COMMAND".padEnd(14),        C.bold, C.white) +
        color("USAGE".padEnd(26),          C.bold, C.white) +
        color("DESCRIPTION",               C.bold, C.white)
      );
      console.log(color("  " + "─".repeat(72), C.gray));
      results.forEach(({ cat, cmd, usage, desc }) => {
        const catColor = CAT_COLORS[cat] || C.white;
        console.log(
          color("  " + cat.padEnd(12),   C.yellow) +
          color(cmd.padEnd(14),          catColor, C.bold) +
          color(usage.padEnd(26),        C.gray) +
          color(desc,                    C.white)
        );
      });
      console.log(color("  " + "─".repeat(72), C.gray));
      console.log(color(`\n  Found ${results.length} result(s)\n`, C.gray));
    }
  }

} else if (flag === "--list" || flag === "-l") {
  showBanner();
  console.log(color("  📂 Available Categories:\n", C.bold, C.white));
  Object.entries(COMMANDS).forEach(([cat, cmds]) => {
    const catColor = CAT_COLORS[cat] || C.white;
    console.log(
      color("  ● ", catColor) +
      color(cat.padEnd(14), C.bold, C.white) +
      color(`(${cmds.length} commands)`, C.gray)
    );
  });
  console.log();

} else {
  console.log(color(`\n  ❌ Unknown flag: ${flag}`, C.red));
  showHelp();
}