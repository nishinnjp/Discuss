import { loadEnvConfig } from "@next/env";

/** Same env loading as `next dev` / `next build` (includes `.env.local`). `dotenv/config` only reads `.env`. */
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");
