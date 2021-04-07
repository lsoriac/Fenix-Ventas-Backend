   //=======================
   //========PUERTO=========
   //=======================
   //configuramos el puerto
   process.env.PORT = process.env.PORT || 4000

   //=======================
   //========ENTORNO========
   //=======================

   process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

   //===============================
   //============USUARIO============
   //===============================
   process.env.USER_DB = process.env.USER_DB
   process.env.PASS_DB = process.env.PASS_DB

   //=======================
   //=====BASE DE DATOS=====
   //=======================

   process.env.HOST_DB = process.env.HOST_DB || "localhost"
   process.env.USER_DB = process.env.USER_DB || "root"
   process.env.PASS_DB = process.env.PASS_DB || "Aq/wp7514"
   process.env.NAME_DB = process.env.NAME_DB || "bdventas"

   //===============================
   //=====SEED DE AUTENTICACIÓN=====
   //===============================

   process.env.SEED = process.env.SEED || 'seed-desarrollo'
   process.env.HOST = process.env.HOST || "http://localhost"

   process.env.CADUCIDAD_TOKEN = 60 * 60