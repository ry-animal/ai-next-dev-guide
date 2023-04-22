import stacks from "@/data/stacks.json";
import Link from "next/link";
import Image from "next/image";

export default function Home() {

  const renderStacks = () => {
    return Object.keys(stacks).map((key) => {
      const stack = stacks[key];
        return (
          <Link
           key={stack.name} 
           href={stack.href}
           className={`${stack.hoverClass} w-24 h-24 border-2 border-solid m-2 rounded-xl relative`}
          >
            <Image 
              src={stack.logo} 
              fill 
              alt={stack.name}
              className="object-cover p-2" 
            />
          </Link>
        )
      }
  )};

  return (
    <main className="h-full flex flex-col justify-center items-center">
      <div>What do you want to use?</div>
      <div className="flex">
        {renderStacks()}
      </div>
    </main>

  )
}
