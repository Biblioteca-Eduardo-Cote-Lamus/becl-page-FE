-- Actualizar las rutas de las imágenes en la tabla prestamos
UPDATE prestamos 
SET foto_carne = REPLACE(foto_carne, '/imagenes_carnets/', '/api/uploads/')
WHERE foto_carne LIKE '/imagenes_carnets/%'; 