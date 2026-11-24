# Plan de colaboración con Gemini

## Roles
- ChatGPT: coordinación del proyecto, planificación, integración de cambios, documentación y revisión general.
- Gemini: segundo colaborador para proponer soluciones, revisar código, detectar errores y desarrollar tareas concretas.
- GitHub: fuente principal y compartida del proyecto.

## Reglas para trabajar juntos
1. Antes de modificar archivos, leer README.md y la fase activa.
2. Trabajar en una tarea pequeña y definida por vez.
3. Indicar siempre qué archivos se van a crear o modificar.
4. No reemplazar archivos completos sin revisar su contenido actual.
5. Entregar código completo y explicar cómo probarlo.
6. No inventar que una función ya está implementada si solo es una propuesta.
7. Guardar los cambios en GitHub y comunicar los archivos modificados.
8. ChatGPT revisará e integrará las propuestas antes de considerarlas parte oficial del juego.

## Tarea inicial para Gemini
Lee README.md, DOCUMENTACION/PLAN_DE_DESARROLLO.md y DOCUMENTACION/CAMARAS_Y_CONTROLES.md. Revisa la estructura actual del proyecto y propone mejoras para la arquitectura de la futura cámara 3D con Three.js. Por ahora no modifiques archivos ni construyas funciones todavía: entrega un plan técnico breve, indicando archivos previstos, controles y cómo evitar que la cámara atraviese objetos.

## Decisiones ya aprobadas
- Juego original de mundo abierto para navegador.
- Tecnología: HTML, CSS, JavaScript y Three.js.
- Cámara principal en tercera persona.
- Cambio entre primera y tercera persona a pie y dentro de vehículos mediante V.
- La vista al entrar a un vehículo no debe cambiarse automáticamente a primera persona.
