import { BeakerIcon, BookOpen, BookOpenIcon, FilePen, WandSparkles } from "lucide-react"
import Link from "next/link"

function Header() {
  return (
    <header className="relative pt-16 pb-8 text-center">
        <Link href="/">
            <div>
                <h1 className="text-5xl font-bold flex align-middle justify-center"><WandSparkles className="h-12 w-9 mr-3"/> Storyteller AI</h1>
                <div className="flex justify-center whitespace-nowrap space-x-5 text-md pt-5  text-slate-500">
               
                {/* <div className="relative">
                    <div className="absolute bg-gradient-to-r from-purple-500 to-pink-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1" />
                    <p className="relative text-white">to life!</p>
                </div><*/}
                </div> 
            </div>
            
        </Link>
            {/* <div className="absolute -top-5 right-5 flex space-x-2">
                <Link href="/">
                    <FilePen className="w-8 h-8 lg:w-10 lg:h-10 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer" />
                </Link>
                <Link href="/stories">
                    <BookOpen className="w-8 h-8 lg:w-10 lg:h-10 mx-auto text-purple-500 mt-10 border border-purple-500 p-2 rounded-md hover:opacity-50 cursor-pointer" />
                </Link>
            </div> */}
    </header>
  )
}

export default Header
