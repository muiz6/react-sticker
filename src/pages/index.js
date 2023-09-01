import React from "react"

import { MdSync } from "react-icons/md";

export default function Home() {
  return (
    <section>
      <div className="flex justify-center items-center bg-[url(/assets/bg.webp)] py-20">
        <div className="border-dashed border-4 border-gray-900 relative">
          <img src="/assets/psyduck.png" />
          <div className="bg-white shadow-lg p-2 absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 rounded-full">
            <MdSync />
          </div>
        </div>
      </div>
    </section>
  )
}
