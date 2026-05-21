
function TerminalComponent() {
  return (
    <>
        {/* TERMINAL */}
<div className="hidden lg:flex w-full flex-col justify-between rounded-xl bg-[#111d30] p-2 shadow-lg shadow-black/40 border border-[#1f2d45] overflow-hidden">
  
  {/* Header terminal */}
  <div className="mb-5 flex items-center gap-2 border-b border-[#24324a] pb-3">
    <div className="h-3 w-3 rounded-full bg-red-400" />
    <div className="h-3 w-3 rounded-full bg-yellow-400" />
    <div className="h-3 w-3 rounded-full bg-green-400" />

    <span className="ml-3 text-sm text-gray-400">
        ressane@portfolio:~$ cat about_me.txt
    </span>
  </div>

  {/* Content */}
  <div className="flex flex-col gap-1 font-mono text-sm xl:text-base">
    
    <div className="flex items-center gap-2">
      <span className="text-green-400">{">"}</span>
      <span className="text-green-400">status</span>
    </div>

    <p className="pl-5 text-white">
      Disponible pour nouveaux projets
    </p>

    <div className="flex items-center gap-2">
      <span className="text-green-400">{">"}</span>
      <span className="text-gray-400">spécialité</span>
    </div>

    <p className="pl-5 text-cyan-300">
      FullStack React / Node.js
    </p>

    <div className="flex items-center gap-2">
      <span className="text-green-400">{">"}</span>
      <span className="text-green-400">stack</span>
    </div>

    <p className="pl-5 text-gray-300 leading-relaxed">
      React, Next.js, Node.js, PostgreSQL, MongoDB,
      TypeScript, Docker
    </p>

    <div className="flex items-center gap-2">
      <span className="text-green-400">{">"}</span>
      <span className="text-green-400">expérience</span>
    </div>

    <p className="pl-5 text-white">
      1+ ans de développement web
    </p>

    {/* Cursor animation */}
    <div className="mt-2 flex items-center gap-1 pl-5">
      <span className="text-green-400">$</span>

      <span className="h-5 w-2.5 animate-pulse rounded-sm bg-green-400" />
    </div>
  </div>
</div>

    </>
  )
}

export default TerminalComponent