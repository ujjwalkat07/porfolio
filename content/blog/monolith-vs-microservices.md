---
title: "Monolith vs Microservices - A brief introduction"
category: "System Design"
description: "Monolith is an architectural style for building a web application in which all components of the application, such as the Auth "
date: "Jul 12, 2026"
lastModified: "Jul 13, 2026"
readTime: "5 min read"
tags: ["System Design","System Architecture","Engineering","Monolith vs Microservices"]
keywords: ["Software Architecture", "Scaling Systems", "Distributed Systems", "Web Performance", "API Gateway","Monolith","Microservices", "Monolith vs Microservices","System Design basics"]
link: "https://ujjwalkatiyar.in/blog/monolith-vs-microservices"
---
# Monolith vs Microservices

In this blog, we will understand the difference between a monolith and microservices and what the use cases of a monolith and microservices are.

## What is a Monolith?
A Monolith is an architectural style for building a web application in which all components of the application, such as the Auth service, Payment service, product service, and other services, are part of a single codebase and deployed as a single unit.

Here is a simple diagram representation of a monolith architecture :
```
my-app/
├── src/
│   ├── controllers/      
│   ├── services/         
│   ├── models/           
│   ├── routes/           
│   ├── middleware/       
│   ├── config/           
│   ├── utils/           
│   └── app.js                 
└── package.json

```
## What are Microservices?
Microservices are an architectural style for building a web application in which all components of the application, such as the Auth service, Payment service, product service, and other services, are different applications that are connected to each other using API Gateways and can be deployed independently.

In simple words. Microservices are a collection of multiple small applications that work together to serve the same functionality as a monolith does. Where each service has its own database and can be developed independently.

Here is a good example of a microservices architecture :
```
microservices/
│
├── api-gateway/
│   ├── src/
│   ├── package.json
│
├── auth-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── package.json
│
├── order-service/
│   ├── src/
│   ├── package.json
│
├── payment-service/
│   ├── src/
│   ├── package.json
└── docker-compose.yml
```
So, the question arises, **why do we need microservices when a monolith is doing the same job?**
<br/>
Let us understand the problems with monoliths. As we know, monoliths have a thighly coupled architecture where all the components are connected to each other, and if one component fails, then the entire application will fail. Also, if we want to scale the service, we have to scale the entire application. Which is not efficient.

Let's take an example of an e-commerce website. 
```
users -> 1000+ requests per minute
payment -> 500+ requests per minute
product -> 5000+ requests per minute
auth -> 100+ requests per minute
```
Here we clearly see the stats that the product service is having more requests then other services, and the auth service is having less requests then other services. So if we want to scale the product service, we have to scale the entire application. Which is not efficient in terms of cost and time.

So here microservices come into the picture. In microservices, we can scale the service independently. So if we want to scale the product service, we can scale it independently, and if we want to scale the auth service, we can scale it independently. Which is efficient in terms of cost and time.

## Quick differnces between monolith and microservices:

| Feature | Monolith | Microservices |
| --- | --- | --- |
| Architecture | It has single codebase, where all the components are connected to each other | It has multiple codebases, where each service has its own codebase |
| Deployment | Single codebase deployment | Multiple independent codebase deployment |
| Scaling | Scale entire application | Scale independent services |
| Technology | Single technology stack like Nodejs, FastApi, Springboot, etc | Multiple technologies allowed like Nodejs, FastApi, Springboot, etc. |
| Database | It has a single database | It can have multiple databases |
| Complexity | Low, due to single codebase and easy to debug | High, due to multiple codebases and complex to debug |


In next post, we will understand how to migrate from monolith to microservices, trade-offs, use cases, implementation, etc.

