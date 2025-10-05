import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignOutButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <SignedOut>
        <SignUpButton mode="modal">
          <Button>Sign up</Button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton>
          <Button>Logout</Button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
}
