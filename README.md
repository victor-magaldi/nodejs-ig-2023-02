# nodejs-ig-2023-02

## NPM script Migration
example for create migration
```
  npm run migration --name=create_documents
```
edit your migration in /db/migrations

run migrations
```
npm run migrate:latest
```


## Exmaple migrations Knex
First configure knext with a ts file 
```
cd src
npx knex init -x ts
```

Then
```
cd src
npx knex migrate:make create_documents -x ts
```