import React from "react";

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-4">
      <h1 className="text-4xl font-bold text-red-600">
        404 - Página no encontrada
      </h1>
      <p className="my-4 text-lg text-gray-700">
        Lo sentimos, la página que buscas no existe.
      </p>
      <a
        href="/"
        className="mt-10 px-4 py-2 bg-secondaries_red-900 text-white rounded hover:bg-red"
      >
        Volver al inicio
      </a>
      </div>
    </div>
  );
};

export default Custom404;
