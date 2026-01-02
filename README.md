# nodejs-ig-2023-02

## NPM script Migration
example for create migration create_documents
```
  npm run migration:create --name=create_documents
```
edit your migration in /db/migrations

run migrations
```
npm run migrate:latest
```

Example rollback migration
```
npm run migrate:rollback
```

## Example migrations Knex
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