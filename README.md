# Next.js Teslo-Shop App

para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

MongoDB URL local:

```
mongodb://localhost:27017/teslodb
```

- Reconstruir modulos de node y levantar next

```
    pnpm i
    pnpm run dev
```

##Configurar las variables de entorno
Renombrar el archivo **.env.template** a **.env**

## Llenar la base de datos con información de pruebas

Llamara:

```
    http://localhost:3000/api/seed
```
