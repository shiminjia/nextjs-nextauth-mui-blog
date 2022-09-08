
This framework is suitable for fast-developing web applications that require login but have average traffic.
It uses React.js and Next.js to implement a single web application, and uses Next.js API Router to implement api, and Next-Auth to implement Oauth 2.0.

# Example
https://nextjs-nextauth-mui-blog.vercel.app/
*if you log in, your information from the provider will be sent to database.

# Features   
Singer Page App      
Restful API    
Oauth 2.0    
ORM by prisma
Auto http logger  
Google Analytics    
Top Progress Bar    
Auto DevOps 

# Technology Stack   
next.js + NextAuth.js + mui + prisma       
next.js: Next.js is an open-source web development framework built on top of Node.js enabling React-based web applications functionalities such as server-side rendering and generating static websites.    
NextAuth.js: Authentication for Next.js.    
mui: The React component library you always wanted.    
prisma: Next-generation Node.js and TypeScript ORM. 
Logger: morgan + winston

# Installation
(An example for local environment. If you have serveral environent, you can make more env file at env)
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
npx prisma db push # you can use npx prisma migrate dev also
# start server
yarn dev
```

Your app should be up and running on http://localhost:3000! If it doesn't work, post on GitHub discussions.    

# Environment Variable
## prisma
#### NODE_ENV(required)
```env
# development environement
NODE_ENV=development
# production environement
NODE_ENV=production
```

#### DATABASE_URL(required)
you need to create a database at local or on the cloud.
Note user, password, ip address, port and name of this database, then fill into DATABASE_URL like this.
```env
DATABASE_URL=mysql://$user:$password@$10.10.ip.address:$port/$name?synchronize=true
```
you can refer to https://www.prisma.io/docs/concepts/database-connectors/mysql

`synchronize=true` allow you to use `db push` instead of `prisma migrate`.
Do not add `synchronize=true` in the production environement.
you can refer to https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push#choosing-db-push-or-prisma-migrate

#### DEBUG(optional)
if you want to use the debug mode of prisma, please comment out DEBUG like this.
```env
DEBUG="*"
```
you can refer to https://www.prisma.io/docs/guides/database/troubleshooting-orm/creating-bug-reports#include-logging-and-debugging-output

### API URL(required)
the url for api routers which made in the pages/api.
```env
# localhost
API_URL=http://localhost:3000/api
# other environement
API_URL=$path/api
```

### next-auth(required)
You can refer to this blog to fill in environment variable about next-auth.
https://refine.dev/blog/nextauth-google-github-authentication-nextjs/
(Create API Routes ~ For GithubProvider (you will need a GitHub account):)

### GOOGLE_ANALYTICS(optional)
You can refer to this blog https://support.google.com/analytics/answer/9539598?hl=en

# Folder tree
.
├── components                    components used in pages
│   ├── TopProgressBar.js         top ProgressBar
│   └── theme.js
│   └── ...
├── env                           env file
├── lib                           lib file
│   ├── ga.js                     google analytics
│   ├── logger.js                 base logger
│   ├── mlogger.js                advanced logger that use base logger
│   ├── prisma.js                 prisma lib
│   └── reponse.js                reponse lib
├── middleware                    
│   ├── common.js                 common middleware used in api router
│   ├── init-middleware.js
│   ├── morganMiddleware.js
│   └── validate-middleware.js
├── pages
│   ├── api                       api router
│   │   ├── auth                  oauth 2.0 api
│   │   ├── drafts                get all drafts api
│   │   ├── post                  post one draft api
│   │   ├── posts                 get all feeds api
│   │   ├── publish               publish one draft api
│   │   └── hello.js              
│   ├── p                         
│   │   └── [id].js               feed page
│   ├── _app.js                   next.js file
│   ├── _document.js              next.js file
│   ├── create.js                 create draft page
│   ├── drafts.js                 drafts page
│   └── index.js                  home page
├── prisma
│   ├── migrations
│   │   ├── 20220724102404_next_auth    ddl file 
│   │   └── migration_lock.toml
│   └── schema.prisma                   table defination
├── public
│   ├── favicon.ico                     
│   └── vercel.svg                      
├── styles
│   ├── Home.module.css                 css file for pages or components(not used in this project)
│   └── globals.css                     globals css
├── README.md
├── next.config.js                      config file for next.js
├── package.json 
├── postcss.config.js                   tailwind config file
├── tailwind.config.js                  tailwind config file
└── yarn.lock

# Teams work
in making

# Problem  
1.App and DB are in the different network, so it may be slow to access db. Can not use Prisma integration in vercel, because it is just in development.
2.Delete user
