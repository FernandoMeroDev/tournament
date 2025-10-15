# Tournament

Aplicación web para la administración de eventos deportivos.

# Levantar en ambiente local

Este proyecto usa [Nx](https://nx.dev/docs/getting-started/intro) para la administración de dependencias y tecnologías.

Clonar repositorio:

```sh
git clone https://github.com/FernandoMeroDev/tournament
```

Instalar dependencias:

```sh
npm install
```

Instalar Nx CLI:
```sh
npm add --global nx
```

Servir Frontend (Angular en puerto 4200):

```sh
nx serve tournament
```

Servir API (NestJS en puerto 3000):

```sh
nx serve api
```