# Fase 2 — Motor y mundo 3D básico

## Objetivo
Sustituir progresivamente la pantalla de bienvenida como única experiencia por una escena 3D pequeña, estable y comprobable en el navegador.

## Tareas
1. Integrar Three.js en el proyecto sin eliminar la pantalla inicial existente.
2. Crear el núcleo de escena: renderer, escena, cámara, iluminación y bucle de animación.
3. Ajustar el canvas al tamaño de la ventana y liberar recursos al reiniciar si aplica.
4. Definir la escala: 1 unidad = 1 metro.
5. Crear una zona de prueba con suelo, calles sencillas y edificios geométricos.
6. Añadir controles básicos para explorar la escena.
7. Preparar la estructura modular descrita en DOCUMENTACION/ARQUITECTURA_MUNDO_3D.md.
8. Probar en Chrome y revisar la consola por errores.

## Entregable
Una escena 3D de prueba que cargue en el navegador, con cámara e iluminación funcionales y una pequeña zona explorable.

## Criterios para cerrar la fase
- La escena se muestra correctamente en Chrome.
- El canvas se adapta al cambiar el tamaño de la ventana.
- La cámara no inicia dentro del suelo ni de los edificios.
- Los controles básicos responden.
- La pantalla inicial actual no se pierde sin una transición acordada.
- Se documenta cómo ejecutar y probar la escena.

## No incluido todavía
Conducción completa, tráfico, ciudad extensa, misiones, policía, inventario y modo historia. Se desarrollarán en sus fases correspondientes.
