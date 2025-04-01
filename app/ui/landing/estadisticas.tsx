'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { BarChart } from '@mui/x-charts'
import { montserrat } from '@/app/ui/fonts'
import { ProgramaData } from '@/app/lib/definitions'

const Estadisticas = () => {
  const [users, setUsers] = useState<string | null>(null)
  const [dataFisica, setDataFisica] = useState<ProgramaData[]>([])
  const [displayCount, setDisplayCount] = useState(0)

  const countRef = useRef(null)
  const isInView = useInView(countRef, { once: true, margin: '-100px 0px' })

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        const value = data?.rows?.[0]?.metricValues?.[0]?.value
        setUsers(value || '0')
      })
      .catch((err) => {
        console.error('Error obteniendo datos de usuarios:', err)
        setUsers('0') // Establece '0' en caso de error
      })

    fetch(
      'https://ufps.cloudbiteca.com/ProyectoEntradaBECL/admin/controladores/api_grafica.php'
    )
      .then((res) => res.json())
      .then((data) => {
        setDataFisica(data.programas || []) // Se asegura que data siempre sea un array
      })
      .catch((err) => console.error('Error obteniendo datos:', err))
  }, [])

  useEffect(() => {
    if (isInView && users !== null) {
      const targetValue = parseInt(users, 10)

      if (!isNaN(targetValue)) {
        const controls = animate(0, targetValue, {
          duration: 3,
          onUpdate(value) {
            setDisplayCount(Math.round(value))
          }
        })

        return () => controls.stop()
      } else {
        setDisplayCount(0)
      }
    }
  }, [isInView, users])

  return (
    <section className='flex flex-col items-center justify-center bg-gray-100'>
      <h2
        className={`mt-12 sm:mt-16 md:mt-20 text-center text-3xl sm:text-4xl md:text-5xl text-secondaries_red-900 font-semibold ${montserrat.className} animate-slide-up`}
      >
        Estadísticas
      </h2>
      <div className='w-full flex flex-col md:flex-row  items-center justify-center px-8'>
        <motion.div
          ref={countRef} // Asigna el ref aquí
          className='md:w-1/2 w-full flex flex-col items-center justify-center my-8'
        >
          <p className='text-2xl text-center'>
            Ingresos (Página web) en los últimos 30 días
          </p>
          <p className='text-5xl font-bold'>{displayCount}</p>
        </motion.div>
        <div className='md:w-1/2 w-full h-full flex flex-col items-center justify-center'>
          <p className='text-2xl'>Programas con más ingresos</p>
          <p className='text-2xl'>a las instalaciones físicas</p>
          <div className='h-[300px] mt-8'>
            <BarChart
              loading={dataFisica.length === 0}
              series={[
                {
                  data: dataFisica.map((item) => item.total) // Extrae los valores correctamente
                }
              ]}
              height={290}
              width={300}
              xAxis={[
                {
                  data: dataFisica.map((item) => item.programa), // Extrae los nombres de los programas
                  scaleType: 'band',
                  tickLabelInterval: () => false,
                  colorMap: {
                    type: 'ordinal',
                    colors: [
                      '#FFCDD2',
                      '#EF9A9A',
                      '#E57373',
                      '#D32F2F',
                      '#B71C1C'
                    ]
                  }
                }
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Estadisticas
