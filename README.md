# App

GymPass Style App

## RFs

- [X] deve ser possível se cadastrar
- [X] deve ser possível se autenticar
- [X] deve ser possível obter o perfil de um usuário logado
- [X] deve ser possível obter o número de check-ins realizados pelo usuário logado
- [X] deve ser possível o usuário obter seu histórioco de check-ins
- [X] deve ser possível o usuário buscar academias próximas (até 10km)
- [X] deve ser possível o usuário buscar academias pelo nome
- [X] deve ser possível o usuário realizar check-in em uma academia
- [X] deve ser possível validar o ckeck-in de um usuário
- [X] deve ser possível cadastrar uma academia


## RNs

- [X] o usuário não deve poder se cadastrar com um e-mail duplicado
- [X] o usuário não pode fazer 2 check-ins no mesmo dia
- [X] o usuário não pode fazer check-in se não estiver perto (100m) da academia
- [X] o check-in só pode ser validado até 20 minutos após criado
- [ ] o check-in só pode ser validado por administradores
- [ ] a academia só pode ser cadastrada por administradores


## RNFs

- [X] a senha do usuário precisa estar criptografada
- [X] os dados da aplicação precisam estar persistidos em um banco PostegreSQL
- [X] todas as listas de dados precisam estar paginadas com 20 items por página
- [ ] o usuário deve ser identificado por um JWT


cd src/modules && mkdir [MODULE] && cd [MODULE] && module=$(pwd)

cd $module && \
mkdir -p application/usecases && touch $_/index.ts && \
mkdir -p domain/constants && touch $_/index.ts && \
mkdir -p domain/errors && touch $_/index.ts && \
mkdir -p domain/factories && touch $_/index.ts && \ 
mkdir -p domain/schemas && touch $_/index.ts && \
mkdir -p infra/controllers && touch $_/index.ts && \
mkdir -p infra/repositories && touch $_/index.ts && \
mkdir -p infra/repositories/in-memory && touch $_/index.ts && \
mkdir -p infra/repositories/interfaces && touch $_/index.ts && \
mkdir -p infra/repositories/prisma && touch $_/index.ts
