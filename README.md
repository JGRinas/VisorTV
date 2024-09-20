# Visor TV

Este proyecto es un sistema de administración y visualización de pantallas con diferentes componentes, pensado para usuarios con diferentes roles (administrador, operador y normal). A continuación se detallan las características principales del sistema.

## Características

### Usuarios

- El sistema admite tres tipos de usuarios: **administrador**, **operador** y **normal**.
- **Administrador** y **operador** pueden iniciar sesión.
- **Administrador** tiene acceso a la lista de usuarios, donde puede:
  - Agregar nuevos usuarios con rol, nombre de usuario y contraseña.
  - Editar usuarios, pudiendo cambiar el rol, nombre de usuario y contraseña.
  - Eliminar usuarios.

### Pantallas

- El sistema permite al **administrador** crear nuevas pantallas.
  - Al crear una pantalla, debe asignar un nombre e indicar qué componentes incluir:
    - Widget de clima.
    - Cámaras del puente Chaco-Corrientes.
    - Lista de información estática que funciona como un carrusel.
  - El administrador también debe asignar qué **operador** puede editar la pantalla.
- Los **operadores** pueden acceder a la lista de pantallas asignadas y editarlas, pudiendo:
  - Cambiar el nombre de la pantalla.
  - Editar los componentes: widget de clima, cámaras del puente, lista de información estática.
- Todos los usuarios pueden acceder a las pantallas creadas, según su rol.

### Componentes de las Pantallas

Cada pantalla puede contener uno o varios de los siguientes componentes:

- **Widget de clima**: Muestra la información del clima, permitiendo ingresar país y provincia. La información que se muestra incluye:
  - Estado del clima (soleado, nublado, lluvioso, etc.).
  - Temperatura actual.
  - Porcentaje de humedad.
- **Cámaras del puente Chaco-Corrientes**: Muestra transmisión en vivo de las cámaras del puente.

- **Información estática**: Se puede agregar información fija que no cambia.

- **Carrusel de información estática**: Se puede agregar una lista de información que se desplaza de forma cíclica.

Además, cualquier componente puede ser eliminado de una pantalla en cualquier momento.

## Arquitectura

El proyecto sigue la **Clean Architecture**, organizada en las siguientes capas:

- **Application**: Aquí se definen las reglas de negocio y los casos de uso.
- **Domain**: Contiene las entidades e interfaces principales del sistema.
- **Infrastructure**: Esta capa se encarga de la interacción con recursos externos (API, bases de datos, etc.).
- **Presentation**: Capa encargada de la interfaz gráfica de usuario y la interacción con el frontend.
