/* eslint-disable no-console */
import { execSync } from "node:child_process";

const remote = process.argv.includes("--remote");
const cmd = `wrangler d1 migrations apply yazsad ${remote ? "--remote" : "--local"}`;
console.log(`Çalıştırılıyor: ${cmd}`);
execSync(cmd, { stdio: "inherit" });
