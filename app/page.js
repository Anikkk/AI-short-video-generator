import { Button } from "@/components/ui/button";
import Image from "next/image";
import {UserButton} from '@clerk/nextjs'

export default function Home() {
  return (
    <div>
    <h1>hi This is Aniket Kumar</h1> 
    <Button>Aniket Kumar</Button>
    <UserButton/>
    </div>
  );
}
