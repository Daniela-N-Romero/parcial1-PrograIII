# Proyecto: Protección de Rutas (Educativo)

## ✍️ Descripción

Este es un proyecto de demostración creado con fines educativos para ilustrar un mecanismo básico de protección de rutas en el lado del cliente (frontend) utilizando **Vite** y **TypeScript**.

Originalmente enfocado en la protección de rutas, demostrando como existen funcionalidades a las que se puede acceder según roles de usuario, se ha transformado en una tienda funcional que incluye un catálogo de productos, sistema de búsqueda, filtros por categoría y un carrito de compras con persistencia .

---

## ⚠️ ¡Importante! Nivel de Seguridad

La protección de rutas implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.
La lógica de autenticación se basa en datos guardados en `localStorage` en el navegador del usuario.

Este enfoque es útil únicamente para fines de aprendizaje y para prototipos de bajo riesgo. La seguridad real debe implementarse en el **backend**.

---

## 🚀 Inicio del proyecto

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## ⚙️ ¿Cómo Funciona la Protección de Rutas?

El mecanismo es simple y se gestiona desde el código TypeScript en la carpeta `src/utils`:

1.  **Inicio de Sesión**: Cuando un usuario se "loguea", su información (incluido su rol) se guarda como un string JSON en `localStorage`.
2.  **Carga de Página Protegida**: Cada vez que se intenta cargar una página protegida (ej. tienda como usuario Administrador), se ejecuta un script de verificación (`checkAuhtUser` en `src/utils/auth.ts`).
3.  **Verificación**: El script comprueba:
    - Si existe un usuario en `localStorage`. 
    - Según el rol del usuario guardado coincide se accede a diferentes páginas. Algunos roles tienen el acceso denegado ciertas páginas y funcionalidades del sitio.
4.  **Cierre de Sesión (Logout)**: Al cerrar sesión, la información de sesión del usuario se elimina de `localStorage`.


## 🏗️ Seed Data y Roles de Usuario

# Registro de Usuarios:

Solo Clientes: El formulario de registro está diseñado exclusivamente para la creación de perfiles tipo client. Esto asegura que cualquier usuario nuevo tenga acceso al catálogo y al carrito, pero no a las funciones de gestión.

# SeedAdmin (Acceso para Evaluación)

Para facilitar las pruebas de la plataforma, el sistema cuenta con un SeedAdmin que se inicializa automáticamente en el primer acceso. No es necesario registrarse para probar el rol de administrador. 

- Credenciales de Admin:
Email: admin@foodstore.com
Password: password123 

- Funcionamiento: Al cargar el proyecto, una función verifica si el administrador ya existe en el localStorage. De no ser así, lo crea automáticamente para permitir el acceso a las rutas protegidas de gestión.

---

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── data/                 # Archivo que simula base de datos
│       └── data.ts           # Definición de PRODUCTS y categorías
│   ├── pages/                # Contiene las páginas de la aplicación
│   │   ├── admin/            # Páginas solo para administradores
│   │   ├── auth/             # Páginas de autenticación (login, registro)
│   │   ├── client/           # Páginas solo para clientes
│   │   └── store/            # Páginas de la tienda 
│   │        ├── cart/        # Vista de carrito y cálculo de total (solo para clientes)
│   │        └── home/        # Catálogo, búsqueda y filtros
│   ├── types/                # Define las interfaces y tipos (IUser, IUserStorage, Rol, Product, category, CartItem)
│   └── utils/                # Lógica reutilizable
│       ├── alert.ts   # Funcion para alerts personalizados
│       ├── auth.ts           # Función principal de verificación de rol y sesión
│       ├── localStorage.ts   # Funciones para leer/escribir en localStorage
│       └── navigate.ts       # Función para redirigir al usuario
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```

## 🌟 Nuevas Funcionalidades (Parcial 1)

# 🛒 Carrito de Compras con Persistencia

- Gestión de ítems: Permite agregar productos al carrito evitando duplicados, incrementando la cantidad si el producto ya existe.  
- Persistencia por Usuario: El carrito se guarda en localStorage utilizando una clave vinculada al email del usuario logueado (cart_email@ejemplo.com), asegurando que cada cliente tenga su propio pedido.  
- Controles Dinámicos: En la vista del carrito, el usuario puede aumentar o disminuir cantidades y eliminar productos.  
- Cálculo Automático: La aplicación calcula y muestra en tiempo real el total de la compra basado en los precios y cantidades actuales.  

# 🔍 Catálogo Interactivo

- Búsqueda en Tiempo Real: Campo de búsqueda por nombre que filtra el catálogo dinámicamente y notifica si no hay coincidencias.  
- Filtrado por Categorías: Menú lateral que permite segmentar los productos por tipo (Pizzas, Hamburguesas, etc.) recuperados dinámicamente.  
- Validación de Stock: Los productos sin existencdisponibilidad ias (stock: 0) se muestran visualmente deshabilitados para la compra.  

# ⚠️ Seguridad y Limitaciones

- Autenticación Frontend: La lógica de acceso sigue basándose en localStorage. El acceso al carrito y la capacidad de agregar productos está restringido exclusivamente a usuarios con el rol client.

- Foco en Lógica Frontend: No se implementó conexión con backend ni procesos de checkout reales, centrando la evaluación en la manipulación del DOM y la lógica de negocio en el cliente .

## 💡 Nota para el docente
El video de presentación (obligatorio) se encuentra adjunto a este zip o en este enlace: ...