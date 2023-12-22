# LOTERIA DE NAVIDAD

Gracias a "el pais" podemos obtener la lista de los resultados de la loteria nacional y comprobar nuestro numero premiado pasando un array de numeros.

# Como usar el servicio

```js
curl -X POST -H "Content-Type: application/json" -d '{"numeros": [12345, 67890, 00123]}' http://localhost:3000/consultar-premios
```
