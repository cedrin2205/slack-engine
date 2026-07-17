import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma", 
  datasource: {
    url: "postgresql://postgres.tvmnwszyzajwjmqbkqrr:F%24jtZJ9s%24%40.syKP@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true", 
    directUrl: "postgresql://postgres:F%24jtZJ9s%24%40.syKP@db.tvmnwszyzajwjmqbkqrr.supabase.co:5432/postgres",
  },
});