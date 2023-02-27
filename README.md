# WhatTheCode_TC
Tecnical Challenge for What The Code

Contexto:
Una empresa tiene departamentos internos en los cuales escriben entradas de blog para su pagina web.
Se requiere un sistema administrador en el cual se puedan crear Departamentos y cada departamento debe contener sus propios Usuarios, debe existir un Departamento administrativo que pueda ver todo lo de los otros Departamentos. Los Usuarios deben tener Roles: Admin y Blogger, los Admin deben poder crear Usuarios y los Bloggers deben poder crear entradas de Blog, cada entrada de Blog debe contener quien la creo, su fecha, y el contenido del blog.

Backend:
Usar LB4: https://loopback.io/doc/en/lb4/
Usar MongoDB como database connector
Crear authentication usando JWT de LB4
Se espera que:
Departamento hasMany Usuarios.
Usuario belongsTo Role.
Usuario belongsTo Departamento.
Usuario hasMany Blogs
Blog belongsTo Usuario.

Frontend Admin:
Usar NextJS
Usar Hooks y Functional Components
Usar CSS, Less o SaSS como estilo y evitar usar inline Styles.

# Nota:

Pido disculpas por no implementar LB4, se me dificulto mucho perfeccionarlo. Implemente express ya que 
LB4 esta basado en dicho framework y me permite tener un control mas riguroso del codigo asi como de las herramientas utilizadas,
sobre todo en cuestiones tan delicadas como la autentificacion.
Por el lado de Next Js. aun estoy configurando las vistas correspondientes a los administradores y a los blogger.
Reitero mis disculpas por la demora y en caso de que siga o no el proceso para integrarse al equipo de WhatTheCode voy a continuar con el desarrollo
del proyecto ya que el mismo me permitio no solo reforzar conceptos con los que trabajo a diario, sino que pude comprender el funcionamiento de nuevas dependencias.

Agradezco enormemente el hecho de que me hayan tenido en cuenta

Atte: Mauro :)

# dependencias instaladas:

/next:

npm i sass

/express:

npm i express cors jsonwebtoken mongoose axios@0.7.0 dotenv bcryptjs

npm i nodemon --save-dev (desarrollo)

