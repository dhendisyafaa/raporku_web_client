import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <Button onClick={() => signIn()}>Log in</Button>
      <br />
      <Link href={"/dashboard"} className="underline">
        Dashboard
      </Link>
    </main>
  );
}
