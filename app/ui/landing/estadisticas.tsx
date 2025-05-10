"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { BarChart } from "@mui/x-charts";
import { ProgramaData } from "@/app/lib/definitions";
import { Users, Calendar, Clock, TrendingUp } from "lucide-react";

function animateCounter(
  targetValue: string | undefined | null,
  setDisplayState: (value: number) => void
) {
  const value = parseInt(targetValue || "0", 10);

  if (!isNaN(value)) {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate(animatedValue) {
        setDisplayState(Math.round(animatedValue));
      },
    });
    return controls;
  } else {
    setDisplayState(0);
    return null;
  }
}

const Estadisticas = () => {
  const [webUsers, setWebUsers] = useState<string | null>(null);
  const [dataFisica, setDataFisica] = useState<ProgramaData | null>(null);
  const [displayWebCount, setDisplayWebCount] = useState(0);
  const [displayFisica30d, setDisplayFisica30d] = useState(0);
  const [displayFisica7d, setDisplayFisica7d] = useState(0);
  const [displayFisicaHoy, setDisplayFisicaHoy] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const webCountRef = useRef(null);
  const fisica30dRef = useRef(null);
  const fisica7dRef = useRef(null);
  const fisicaHoyRef = useRef(null);
  const chartRef = useRef(null);

  const isWebInView = useInView(webCountRef, {
    once: true,
    margin: "-100px 0px",
  });
  const isFisica30dInView = useInView(fisica30dRef, {
    once: true,
    margin: "-100px 0px",
  });
  const isFisica7dInView = useInView(fisica7dRef, {
    once: true,
    margin: "-100px 0px",
  });
  const isFisicaHoyInView = useInView(fisicaHoyRef, {
    once: true,
    margin: "-100px 0px",
  });

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        const value = data?.rows?.[0]?.metricValues?.[0]?.value;
        setWebUsers(value || "0");
      })
      .catch((err) => {
        console.error("Error obteniendo datos de usuarios web:", err);
        setWebUsers("0");
        setError("Error al cargar datos de usuarios web");
      });

    fetch(
      `https://ufps.cloudbiteca.com/ProyectoEntradaBECL/admin/controladores/api_grafica.php?timestamp=${new Date().getTime()}`
    )
      .then((res) => res.json())
      .then((data: ProgramaData) => {
        if (data && Array.isArray(data.programas)) {
          setDataFisica(data);
          setError(null);
        } else {
          console.error("Formato inesperado en datos físicos:", data);
          setDataFisica(null);
          setError("Error en el formato de datos físicos");
        }
      })
      .catch((err) => {
        console.error("Error obteniendo datos físicos:", err);
        setDataFisica(null);
        setError("Error al cargar datos físicos");
      });
  }, []);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null;
    if (isWebInView) {
      controls = animateCounter(webUsers, setDisplayWebCount);
    }
    return () => {
      controls?.stop();
    };
  }, [isWebInView, webUsers]);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null;
    if (isFisica30dInView && dataFisica) {
      controls = animateCounter(
        dataFisica.registrosUltimos30Dias,
        setDisplayFisica30d
      );
    }
    return () => {
      controls?.stop();
    };
  }, [isFisica30dInView, dataFisica]);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null;
    if (isFisica7dInView && dataFisica) {
      controls = animateCounter(
        dataFisica.registrosUltimos7Dias,
        setDisplayFisica7d
      );
    }
    return () => {
      controls?.stop();
    };
  }, [isFisica7dInView, dataFisica]);

  useEffect(() => {
    let controls: ReturnType<typeof animate> | null = null;
    if (isFisicaHoyInView && dataFisica) {
      controls = animateCounter(dataFisica.registrosDia, setDisplayFisicaHoy);
    }
    return () => {
      controls?.stop();
    };
  }, [isFisicaHoyInView, dataFisica]);

  return (
    <div className="space-y-12">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {/* Sección de Estadísticas Físicas */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-secondaries_red-900">
          Instalaciones Físicas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            ref={fisica30dRef}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-secondaries_red-900" />
            </div>
            <p className="text-lg text-center text-gray-600 mb-2">
              Últimos 30 días
            </p>
            <p className="text-4xl font-bold text-center text-secondaries_red-900">
              {displayFisica30d}
            </p>
          </motion.div>

          <motion.div
            ref={fisica7dRef}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-secondaries_red-900" />
            </div>
            <p className="text-lg text-center text-gray-600 mb-2">
              Últimos 7 días
            </p>
            <p className="text-4xl font-bold text-center text-secondaries_red-900">
              {displayFisica7d}
            </p>
          </motion.div>

          <motion.div
            ref={fisicaHoyRef}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-secondaries_red-900" />
            </div>
            <p className="text-lg text-center text-gray-600 mb-2">
              Hoy
            </p>
            <p className="text-4xl font-bold text-center text-secondaries_red-900">
              {displayFisicaHoy}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Gráfico de Programas */}
      <div className="bg-white p-0 md:p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 md:mb-6 text-center text-secondaries_red-900">
          Programas con más ingresos físicos
        </h3>
        <div className="w-full max-w-4xl mx-auto">
          <motion.div ref={chartRef} className="min-h-[300px] sm:min-h-[350px] md:min-h-[400px] px-0 md:px-4">
            {dataFisica?.programas && dataFisica.programas.length > 0 ? (
              <BarChart
                loading={dataFisica === null}
                series={[
                  {
                    data: dataFisica.programas.map(
                      (item) => parseInt(item.total, 10) || 0
                    ),
                    color: "#B71C1C",
                    label: "Ingresos"
                  },
                ]}
                height={window.innerWidth < 425 ? 350 : window.innerWidth < 768 ? 400 : 400}
                xAxis={[
                  {
                    data: dataFisica.programas.map((item) => item.programa || ''),
                    scaleType: "band",
                    tickLabelInterval: () => false,
                    tickLabelStyle: {
                      angle: window.innerWidth < 768 ? 45 : 0,
                      textAnchor: 'end',
                      fontSize: window.innerWidth < 425 ? 10 : window.innerWidth < 768 ? 12 : 14,
                    },
                  },
                ]}
                margin={{
                  top: 20,
                  bottom: window.innerWidth < 425 ? 100 : window.innerWidth < 768 ? 120 : 40,
                  left: window.innerWidth < 425 ? 20 : window.innerWidth < 768 ? 30 : 50,
                  right: window.innerWidth < 425 ? 10 : window.innerWidth < 768 ? 20 : 30
                }}
                slotProps={{
                  legend: undefined
                }}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay datos disponibles para mostrar en el gráfico
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Sección de Estadísticas Web */}
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-secondaries_red-900">
          Plataforma Virtual
        </h2>
        <motion.div
          ref={webCountRef}
          className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-secondaries_red-900" />
          </div>
          <p className="text-xl text-center text-gray-600 mb-4">
            Visitas Web (Últimos 30 días)
          </p>
          <p className="text-5xl font-bold text-center text-secondaries_red-900">
            {displayWebCount}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Estadisticas;
