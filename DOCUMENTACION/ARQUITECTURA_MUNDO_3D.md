# Arquitectura base del mundo 3D — GRAND CITY 6

## Objetivo
Preparar una base modular para construir un videojuego original de mundo abierto en navegador con HTML, CSS, JavaScript y Three.js. Esta arquitectura es un plan; no significa que todos los sistemas ya estén implementados.

## Principios
- Empezar con una zona pequeña y jugable antes de ampliar la ciudad.
- Mantener separados renderizado, controles, estado del juego, entidades y HUD.
- Usar 1 unidad de Three.js como 1 metro para mantener escalas coherentes.
- Reutilizar geometrías y materiales; usar InstancedMesh para elementos repetidos cuando convenga.
- Cargar el mundo por sectores cuando el tamaño de la ciudad lo requiera.
- Medir rendimiento y añadir complejidad gradualmente.

## Módulos previstos

| Módulo | Responsabilidad |
|---|---|
| src/core/Engine.js | Escena, renderer, iluminación, bucle y redimensionado |
| src/core/InputManager.js | Teclado, ratón y, más adelante, mando |
| src/state/GameState.js | Estado: a pie, conduciendo, pausa y entidad activa |
| src/state/EventBus.js | Eventos entre sistemas sin acoplamiento innecesario |
| src/world/CityLayout.js | Datos de calles, manzanas, zonas y puntos de aparición |
| src/world/ChunkManager.js | Activación y descarga de sectores según distancia |
| src/entities/ | Personaje, vehículos y otras entidades |
| src/camera/CameraRig.js | Selección de modo y aplicación de cámara |
| src/camera/CameraCollision.js | Evitar que la cámara atraviese obstáculos |
| src/camera/modes/ | Modos de cámara a pie y en vehículo |
| src/ui/ | HUD, menús y pantallas independientes de Three.js |

## Sistema de cámaras aprobado
- A pie: tercera persona como vista inicial y primera persona opcional.
- En vehículo: conservar la vista actual al entrar siempre que sea compatible; permitir tercera persona exterior y primera persona interior.
- Tecla V: alternar las vistas disponibles del modo actual.
- Ratón: orientar la cámara; rueda: ajustar distancia en tercera persona.
- La cámara debe acercarse al objetivo cuando un obstáculo bloquea la línea de visión.
- Las transiciones entre vistas deben ser suaves y no cambiar el modo de juego.

## Componentes de cámara
- CameraRig: coordina el modo activo, el objetivo y las transiciones.
- ThirdPersonFootCamera: sigue al personaje a pie.
- FirstPersonFootCamera: perspectiva del personaje.
- VehicleFollowCamera: sigue al vehículo desde el exterior.
- VehicleInteriorCamera: posición y orientación desde el asiento del conductor.
- CameraCollision: comprueba obstáculos entre el objetivo y la posición deseada.

## Mundo por sectores
CityLayout define los datos de la ciudad. ChunkManager decide qué sectores mantener activos según la posición del jugador. La primera versión puede usar una sola zona pequeña; la carga dinámica se implementará cuando sea necesaria.

## Orden recomendado de implementación
1. Crear una escena Three.js mínima y mostrarla en el navegador.
2. Añadir cámara, iluminación y redimensionado.
3. Crear una zona de prueba con suelo y algunos edificios simples.
4. Implementar controles básicos y un objetivo móvil de prueba.
5. Implementar CameraRig y tercera persona a pie.
6. Añadir primera persona a pie y cambio con V.
7. Incorporar obstáculos y corrección de cámara.
8. Más adelante, integrar cámaras de vehículo con el sistema de conducción.

## Fuera del alcance inicial
Tráfico complejo, ciudad completa, streaming avanzado, físicas realistas, cinemáticas y optimizaciones prematuras. Se abordarán en fases posteriores.

## Estado
Arquitectura propuesta a partir de la revisión de Gemini y adaptada al plan de 10 fases. Pendiente de implementación y pruebas.
