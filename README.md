## Información General
***
Backend básico de un servicio de almacenamiento de tareas.

### Crear tarea
* Para crear una tarea se envía el título de la tarea y alguna descripción.
* Para crear la tarea se usa la ruta: /create y el método post.
* Se debe enviar la tarea y la descripción en un json de la siguiente forma:

```json
{ 
	"title": "task1", 
	"description": "Some thing"
}
```

### Obtener la lista de tareas 
* Para obtener las listas de tareas se usa la ruta /tasks y el método get.

### Actualizar una tarea
* Para actualizar una tarea se debe enviar el id de la correspondiente tarea en un query en la ruta de la siguiente forma: /task?id=1 y el método put.
* Se debe enviar los nuevos valores en un json de la siguiente forma:

```json
{ 
	"title": "other-title", 
	"description": "other-description"
}
```

### Eliminar una tarea
* Para eliminar una tarea se debe enviar el id de la correspondiente tarea en un query en la ruta de la siguiente forma: /task?id=1 y el método delete.

 ## Dependencias
***
* [lowdb](https://www.npmjs.com/package/lowdb/v/1.0.0) Versión 1.0.0

 ## Dependencias de desarrollo
***
* [jest](https://www.npmjs.com/package/jest) Versión 28.1.1
* [nodemon](https://www.npmjs.com/package/nodemon) Versión 2.0.16
* [supertest](https://www.npmjs.com/package/supertest) Versión 6.2.3

## Instalación
***
Para instalar se debe clonar el repositorio, instalar las dependencias con npm install e iniciar con npm start

```
$ git clone https://github.com/FernandoRodriguezValdivia/backend-basico.git
$ cd backend-basico
$ npm install
$ npm start
```

## Test 
***
Para ejecutar los tests se debe ejecutar el comando npm test

```
$ npm test
```