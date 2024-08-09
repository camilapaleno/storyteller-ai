import Image from "next/image";
import logo from "@/images/logo.png"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StoryWriter from "@/components/StoryWriter";
import { BookOpen, BookOpenText, LibraryBig, WandSparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col container ">
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="container order-1 lg:-order-1 flex flex-1">
          <div className="bg-white/30 border border-slate-300 flex flex-col w-full space-y-5 mb-5  rounded-md justify-center items-center  pb-10">
          <BookOpenText className="h-12 w-12"/>
            <Button asChild className="px-10 bg-slate-800 p-5">
              <Link href="/stories">
                Explore Story Library
              </Link>
            </Button>
          </div>          
        </div>

        <StoryWriter />
      </section>
    </main>
  );
}
