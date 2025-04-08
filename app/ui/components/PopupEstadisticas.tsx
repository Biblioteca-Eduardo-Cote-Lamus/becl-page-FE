'use client'
import { ChartNoAxesCombined } from 'lucide-react'

export default function PopupEstadisticas() {
  const handleClick = () => {
    const target = document.getElementById('seccion-estadisticas')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className='fixed bottom-[70px] md:bottom-[88px] left-4 z-10 
                 transition-transform duration-200 ease-in-out 
                 hover:scale-110 
                 bg-[#0048ff] rounded-full w-[52px] h-[52px] md:w-[65px] md:h-[65px] 
                 flex items-center justify-center'
    >
      <button
        onClick={handleClick}
        className='text-white flex justify-center items-center 
                 bg-[#0048ff] w-[42px] h-[42px] md:w-[54px] md:h-[54px] 
                 rounded-full shadow-xl border border-[3px] border-white'
      >
        <ChartNoAxesCombined className='w-[25px] h-[25px] md:w-[35px] md:h-[35px]' />
      </button>
    </div>
  )
}
