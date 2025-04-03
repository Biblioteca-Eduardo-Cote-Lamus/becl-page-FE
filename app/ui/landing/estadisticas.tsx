'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { BarChart } from '@mui/x-charts'
import { montserrat } from '@/app/ui/fonts'
import { ProgramaData } from '@/app/lib/definitions'

function animateCounter(
  targetValue: string | undefined | null,
  setDisplayState: (value: number) => void
) {
  const value = parseInt(targetValue || '0', 10)

  if (!isNaN(value)) {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate(animatedValue) {
        setDisplayState(Math.round(animatedValue))
      }
    })
    return controls
  } else {
    setDisplayState(0)
    return null
  }
}

const Estadisticas = () => {
  const [webUsers, setWebUsers] = useState<string | null>(null)
  const [dataFisica, setDataFisica] = useState<ProgramaData | null>(null)
  const [displayWebCount, setDisplayWebCount] = useState(0)
  const [displayFisica30d, setDisplayFisica30d] = useState(0)
  const [displayFisica7d, setDisplayFisica7d] = useState(0)
  const [displayFisicaHoy, setDisplayFisicaHoy] = useState(0)

  const webCountRef = useRef(null)
  const fisica30dRef = useRef(null)
  const fisica7dRef = useRef(null)
  const fisicaHoyRef = useRef(null)
  const chartRef = useRef(null)

  const isWebInView = useInView(webCountRef, {
    once: true,
    margin: '-100px 0px'
  })
  const isFisica30dInView = useInView(fisica30dRef, {
    once: true,
    margin: '-100px 0px'
  })
  const isFisica7dInView = useInView(fisica7dRef, {
    once: true,
    margin: '-100px 0px'
  })
  const isFisicaHoyInView = useInView(fisicaHoyRef, {
    once: true,
    margin: '-100px 0px'
  })

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        const value = data?.rows?.[0]?.metricValues?.[0]?.value
        setWebUsers(value || '0')
      })
      .catch((err) => {
        console.error('Error obteniendo datos de usuarios web:', err)
        setWebUsers('0')
      })

    fetch(
      `https://ufps.cloudbiteca.com/ProyectoEntradaBECL/admin/controladores/api_grafica.php?timestamp=${new Date().getTime()}`
    )
      .then((res) => res.json())
      .then((data: ProgramaData) => {
        if (data) {
          setDataFisica(data)
        } else {
          console.error('Formato inesperado en datos físicos:', data)
          setDataFisica(null)
        }
      })
      .catch((err) => {
        console.error('Error obteniendo datos físicos:', err)
        setDataFisica(null)
      })
  }, [])

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null
    if (isWebInView) {
      controls = animateCounter(webUsers, setDisplayWebCount)
    }
    return () => {
      controls?.stop()
    }
  }, [isWebInView, webUsers])

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null
    if (isFisica30dInView && dataFisica) {
      controls = animateCounter(
        dataFisica.registrosUltimos30Dias,
        setDisplayFisica30d
      )
    }
    return () => {
      controls?.stop()
    }
  }, [isFisica30dInView, dataFisica])

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null
    if (isFisica7dInView && dataFisica) {
      controls = animateCounter(
        dataFisica.registrosUltimos7Dias,
        setDisplayFisica7d
      )
    }
    return () => {
      controls?.stop()
    }
  }, [isFisica7dInView, dataFisica])

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null
    if (isFisicaHoyInView && dataFisica) {
      controls = animateCounter(dataFisica.registrosDia, setDisplayFisicaHoy)
    }
    return () => {
      controls?.stop()
    }
  }, [isFisicaHoyInView, dataFisica])

  return (
    <section className='flex flex-col items-center justify-center bg-gray-100 py-10 px-4'>
      <h2
        className={`mb-10 text-center text-3xl sm:text-4xl md:text-5xl text-secondaries_red-900 font-semibold ${montserrat.className} animate-slide-up`}
      >
        Estadísticas
      </h2>

      <div className='w-full max-w-6xl mb-12'>
        <p className='text-3xl md:text-4xl font-semibold text-center mb-8'>
          Instalaciones físicas
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
          <motion.div
            ref={fisica30dRef}
            className='flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md'
          >
            <p className='text-xl lg:text-2xl text-center text-gray-600'>
              Ingresos (Últimos 30 días)
            </p>
            <p className='text-4xl lg:text-5xl font-bold text-red-700 mt-2'>
              {displayFisica30d}
            </p>
          </motion.div>
          <motion.div
            ref={fisica7dRef}
            className='flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md'
          >
            <p className='text-xl lg:text-2xl text-center text-gray-600'>
              Ingresos (Últimos 7 días)
            </p>
            <p className='text-4xl lg:text-5xl font-bold text-red-700 mt-2'>
              {displayFisica7d}
            </p>
          </motion.div>
          <motion.div
            ref={fisicaHoyRef}
            className='flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md'
          >
            <p className='text-xl lg:text-2xl text-center text-gray-600'>
              Ingresos (Hoy)
            </p>
            <p className='text-4xl lg:text-5xl font-bold text-red-700 mt-2'>
              {displayFisicaHoy}
            </p>
          </motion.div>
        </div>
        <div className='mt-12 flex flex-col items-center'>
          <p className='text-2xl font-semibold mb-4'>
            Programas con más ingresos físicos
          </p>
          <div className='w-full max-w-lg h-[300px] bg-white p-4 rounded-lg shadow-md'>
            <motion.div ref={chartRef}>
              <BarChart
                loading={dataFisica === null}
                series={[
                  {
                    data:
                      dataFisica?.programas?.map(
                        (item) => parseInt(item.total, 10) || 0
                      ) ?? []
                  }
                ]}
                height={280}
                xAxis={[
                  {
                    data:
                      dataFisica?.programas?.map((item) => item.programa) ?? [],
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
                margin={{ top: 10, bottom: 20, left: 40, right: 10 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className='w-full max-w-2xl mt-10'>
        <p className='text-3xl md:text-4xl font-semibold text-center mb-8'>
          Plataforma virtual
        </p>
        <motion.div
          ref={webCountRef}
          className='flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md'
        >
          <p className='text-xl lg:text-2xl text-center text-gray-600'>
            Ingresos Web (Últimos 30 días)
          </p>
          <p className='text-4xl lg:text-5xl font-bold text-secondaries_red-800 mt-2'>
            {displayWebCount}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Estadisticas
