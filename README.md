# Rick y Morty con GraphQL

Este proyecto combina la API de Rick y Morty con GraphQL, haciendo mucho más instuitivo el uso de la API original.

## Getting Started


### Install

```
npm install
```

### Run 

```
npm run dev
```
Al ejecutarlo, vuelca la API original en un archivo data.json
### Access 
Para acceder a nuestra interfaz, debemos ir a nuestro navegador y acceder a nuestro puerto configurado, por defecto configurado al puerto 3004.


```
http://localhost:3004/
```
## Querys

Desde nuestra API implementada con GraphQL podemos realizar las siguientes querys:

### character
Dando un ID, recibimos la información del personaje.
### characters
Nos devuelve un array de personajes.
Se pueden filtrar elementos como su nombre, estado y planeta.
### planets
Mestra la lista de todos los planetas.
