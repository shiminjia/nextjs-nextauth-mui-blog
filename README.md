
This framework is suitable for fast-developing web applications that require login but have average traffic

# Example
https://nextjs-nextauth-mui-blog.vercel.app/

# Features   
Singer Page App      
Restful API    
Oauth 2.0    
ORM by prisma
Auto http logger  
Google Analytics    
Top Progress Bar    
Auto DevOps 

# Installation
An example for local environment
```shell
cd app
# get dependence
yarn install
```

Open the env/.env.local file and fill in the environment variable.
Please refer to section `Environment Variable`

```shell
# copy env.local file to app directory
cp env/.env.local ./.env
# create table by prisma
npx prisma migrate dev
# start server
yarn dev
```

Your app should be up and running on http://localhost:3000! If it doesn't work, post on GitHub discussions.    

# Environment Variable
## prisma
### NODE_ENV(required)
```env
# development environement
NODE_ENV=development
# production environement
NODE_ENV=production
```

### DATABASE_URL(required)
you need to create a database at local or on the cloud.
Note user, password, ip address, port and name of this database, then fill into DATABASE_URL like this.
```env
DATABASE_URL=mysql://$user:$password@$10.10.ip.address:$port/$name?synchronize=true
```
you can refer to https://www.prisma.io/docs/concepts/database-connectors/mysql

`synchronize=true` allow you to use `db push` instead of `prisma migrate`.
Do not add `synchronize=true` in the production environement.
you can refer to https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate

### DEBUG(optional)
if you want to use the debug mode of prisma, please comment out DEBUG like this.
```env
DEBUG="*"
```
you can refer to https://www.prisma.io/docs/guides/database/troubleshooting-orm/creating-bug-reports#include-logging-and-debugging-output

## API URL(required)
the url for api routers which made in the pages/api.
```env
# localhost
API_URL=http://localhost:3000/api
# other environement
API_URL=$path/api
```

## next-auth(required)
You can refer to this blog to fill in environment variable about next-auth.
https://refine.dev/blog/nextauth-google-github-authentication-nextjs/
(Create API Routes ~ For GithubProvider (you will need a GitHub account):)

## GOOGLE_ANALYTICS(optional)
You can refer to this blog https://support.google.com/analytics/answer/9539598?hl=en

If you have serveral environent, you can make more env file 

# Technology Stack   
next.js + NextAuth.js + mui + prisma       
next.js: Next.js is an open-source web development framework built on top of Node.js enabling React-based web applications functionalities such as server-side rendering and generating static websites.    
NextAuth.js: Authentication for Next.js.    
mui: The React component library you always wanted.    
prisma: Next-generation Node.js and TypeScript ORM. 
Logger: morgan + winston

# Teams work
in making

# Problem  
App and DB are in the different network, so it may be slow to access db. Can not use Prisma integration in vercel, because it is just in development.

