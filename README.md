# Example
https://nextjs-nextauth-mui-blog.vercel.app/

# Installation

First, you need to create a database at local or on the cloud.

```shell
cd app
// get dependence
yarn install
// copy env file to app directory
cp env/.env.local ./.env
```

Open the .env file and fill in environment variable.
You can refer to this blog to fill in environment variable about next-auth 
https://refine.dev/blog/nextauth-google-github-authentication-nextjs/

```shell
// create table by prisma
npx prisma migrate dev
// start server
yarn dev
```

Your app should be up and running on http://localhost:3000! If it doesn't work, post on GitHub discussions.    

# Technology Stack   
next.js + NextAuth.js + mui + prisma       
next.js: Next.js is an open-source web development framework built on top of Node.js enabling React-based web applications functionalities such as server-side rendering and generating static websites.    
NextAuth.js: Authentication for Next.js.    
mui: The React component library you always wanted.    
prisma: Next-generation Node.js and TypeScript ORM.    

# Features   
Singer Page App      
Restful API    
Oauth 2.0    
ORM    
Auto http logger      
Google Analytics    
Top Progress Bar    
Auto DevOps   

# Problem   
