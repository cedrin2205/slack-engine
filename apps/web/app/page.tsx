// This import is safe here because this is a Server Component
import { prisma } from "@slack-engine/database";

export default async function Home() {
  // You can safely query your database directly here in the future
  // const users = await prisma.user.findMany();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white font-sans">
      <h1 className="text-4xl font-bold mb-4">Slack Engine</h1>
      <p className="text-xl text-neutral-400">
        Database Link: <span className="text-green-500 font-bold ml-2">ACTIVE 🎉</span>
      </p>
    </div>
  );
}