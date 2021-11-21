# Shopify Daisy

Shopify Daisy(Database Integration System) is a system for continuously replicating data from Shopify to the databases.

# Tech Stack

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs   
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database


## Getting started

### 1. Clone and install dependencies

<details><summary>Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:datadlog/shopify-daisy.git --depth=1
```

Install npm dependencies:

```
cd shopify-daisy
npm install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also create the `Customer` table that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
npx prisma db seed
```


### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).


## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Retrieve all published posts and their authors

```graphql
query {
  allCustomers {
    email
    first_name
    last_name
    state
  }
}
```


### Create a new user

```graphql
mutation {
  createCustomer(data: { first_name: "Naveen", email: "naveen@datadlog.com" }) {
    id
  }
}
```

## Switch to another database (e.g. PostgreSQL, MySQL, SQL Server, MongoDB)

If you want to try this example with another database than SQLite, you can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block. 

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### PostgreSQL

For PostgreSQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
}
```

Here is an example connection string with a local PostgreSQL database:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://janedoe:mypassword@localhost:5432/notesapi?schema=public"
}
```

### MySQL

For MySQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```

Here is an example connection string with a local MySQL database:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://janedoe:mypassword@localhost:3306/notesapi"
}
```

### Microsoft SQL Server

Here is an example connection string with a local Microsoft SQL Server database:

```prisma
datasource db {
  provider = "sqlserver"
  url      = "sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
}
```

### MongoDB

Here is an example connection string with a local MongoDB database:

```prisma
datasource db {
  provider = "mongodb"
  url      = "mongodb://USERNAME:PASSWORD@HOST/DATABASE?authSource=admin&retryWrites=true&w=majority"
}
```
Because MongoDB is currently in [Preview](https://www.prisma.io/docs/about/releases#preview), you need to specify the `previewFeatures` on your `generator` block:

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["mongodb"]
}
```
</details>
