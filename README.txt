COMANDOS PARA USAR EN EL SERVIDOR

git pull origin main //Traer cambios al servidor

pm2 stop nextjs-dashboard //detiene producción

pnpm install //si se agregan módulos npm se deben instalar nuevamente

pnpm build //Reconstruir aplicación si hay cambios

pm2 restart nextjs-dashboard //Reiniciar Producción

pm2 status //Para ver el estado del despliegue

pm2 logs nextjs-dashboard //Para ver logs de la aplicación
_______________________________________________________________
CREDENCIALES DEL SERVIDOR

Servidores Apolo
host: 192.168.3.38


USER userufpsbi
PASS Th3R0nk1ng
PORT 22

__________________________________________________________________
ENTRAR A CONSOLA SSH COMO ADMIN

consola: su -
consola pass:BiblioUfps2020

USER root
PASS BiblioUfps2020

ruta del proyecto servidor apolo: /var/www/html/nextjs_dashboard/becl-page-FE/
__________________________________________________________________
//para entrar a la base de datos MSQL debe usar el siguiente comando en ssh consola. contraseña en caso de ser requerida "1234"
mysql -u PC_MARCOS -p


//Credenciales de GitHub
Biblioteca-Eduardo-Cote-Lamus
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