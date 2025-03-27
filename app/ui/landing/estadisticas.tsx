'use client'
import { useState, useEffect } from 'react'
import { PieChart } from '@mui/x-charts'
import { montserrat } from '@/app/ui/fonts'

const Estadisticas = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        console.log('Datos obtenidos:', data)
        setUsers(data?.rows?.[0]?.metricValues?.[0]?.value || '0')
      })
      .catch((err) => console.error('Error obteniendo datos:', err))
  }, [])

  return (
    <section className='flex flex-col items-center justify-center bg-gray-100'>
      <h2
        className={`mt-12 sm:mt-16 md:mt-20 text-center text-3xl sm:text-4xl md:text-5xl text-secondaries_red-900 font-semibold ${montserrat.className} animate-slide-up`}
      >
        Estadísticas
      </h2>
      <div className='w-full flex flex-row h-[600px]'>
        <div className='w-1/2 h-full'>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A' },
                  { id: 1, value: 15, label: 'series B' },
                  { id: 2, value: 20, label: 'series C' }
                ]
              }
            ]}
            width={400}
            height={200}
          />
        </div>
        <div className='w-1/2 h-full'></div>
      </div>
    </section>
  )
}

export default Estadisticas
