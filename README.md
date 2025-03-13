# 🚀 (Isaac Submit) Prueba Técnica: API de Cotización de Divisas (Fiat ⇄ Crypto) con NestJS

## 📚 Como Correr el Proyecto

- Ubica en la raiz del repositorio el archivo .env.example
- Copia el contenido de este archivo y crea un archivo .env en la raiz de este repositorio con el contenido copiado (No es necesario cambiar ninguna variable de entorno para correr el proyecto localmente).
- Recuerda el .env creado tiene que estar al mismo nivel que el .env.example y que de los folders ui y api
- Inicia tu servicio de Docker, Si tienes mac o windows "docker desktop", si tienes linux revisa que el servicio este activo en tu linea de comandos con `sudo systemctl status docker`
- En la raiz del repositorio ejecuta: `docker compose up`, Si estas en linux puede ser que necesitas correrlo con permisos de administrador `sudo docker compose up`
- Esto levantara los siguientes servicios en tu computadora local:
  - API en el puerto 3000 (localhost:3000)
  - Base de datos en el puerto 5432, (localhost:5432)
  - Next UI en el puerto 8080, (localhost:8080)

---

## Variables de entorno

- DATABASE_URL= (URL completa que utiliza prisma para conectarse con la base de datos)
- DB_USER= (Usuario que se creara en la base de datos utilizada en el docker compose el servicio de DB)
- DB_PASSWORD= (Passoword para el usuario que se creara con la BD en el docker compose)
- DB_NAME= (Nombre de la BD que se creara en el docker compose)
- JWT_SECRET= (Secreto para firmar los tokens de autenticacion)
- BCRYPT_SALT= (Numero de saltos para encriptar las contraseñas)
- API_HOST=(Utilizada en el proyecto de UI para direccionar las request http hacia el backend)

---

## 🔍 Documentation Backend

- El backend esta documentado con swagger asi que podras encontrar el servidor de swagger ui en la siguiente url:
  - <http://localhost:3000/docs>
- Si necesitas la definicion de OpenAPI en formato JSON para importarlo en Postman esta en:
  - <http://localhost:3000/docs/json>
- Los endpoints de los recursos quote se encuentrar protegido por authentication bearer token revisa el recurso /auth

---

## 🛠 Backend Testing

- Se implementaron pruebas unitarias en los controlladores donde esta concentrada la logica de negocio
- Se pueden ejecutar las pruebas unitarios son los siguientes pasos:
  - Ve al proyecto de api `cd api`
  - Instala las dependencias si todavia no lo has hecho `npm install --force` (El force es por que el swagger server tiene unos conflictos con la nomenclatura de las versiones de los peer dependencies de las librarias de Nestjs)
  - copia el contenido del archivo ./api/.env.example en un archivo .env en la raiz del proyecto api
  - Corre las pruebas con el siguiente commando `npm run test`

---

## Comentarios acerca del cambio de estructura de proyecto y eleccion de la Base de datos

- Cambie la estructura del proyecto a una un poco mas cercana a la mostrada por la documentacion de nestjs donde cada modulo esta separado por funcionalidad o recurso
- utilize prisma y postgresql como base de datos ya que es una herramienta que me gusta mucho y se me hace facil de utilizar

---

## 🤖 Uso de Inteligencia Artificial en el proyecto

- Se utilizaron las siguientes herramientas de IA
- Github copilot
  - Se utilizo para rellenar algunas interfaces, types o implementaciones basicas como un LSP mejorado
- ChatGPT Online
  - Se utilizo como herramienta para generar docker files
  - Se utilizo para consultar "documentacion" de librerias utilizadas
