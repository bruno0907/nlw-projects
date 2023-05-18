import Copyright from "../components/Copyright";
import EmptyMemories from "../components/EmptyMemories";
import Hero from "../components/Hero";
import SignIn from "../components/SignIn";

export default function Home() {
  return (
   <main className="grid grid-cols-2 min-h-screen">    
    <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">      
      <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 rounded-full blur-full"/>      
      <div className="absolute bottom-0 right-2 top-2 w-2 bg-stripes"/>

      <SignIn />      
      <Hero />
      <Copyright />
    </div>
    
    <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
      <EmptyMemories />
    </div>
   </main>
  )
}
