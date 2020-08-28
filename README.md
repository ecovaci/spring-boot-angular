# spring-boot-angular

# Overview
This is a multi-module Maven project aiming to integrate Spring Boot (backend) with Angular (frontend).
It has two Maven modules:
- spring-boot-angular-backend (Spring Boot module)
- spring-boot-angular-frontend (Angular v7 module)

# Requirements
- JDK 8
- npm package manager
- Maven 3 (optional, you can use the included wrapper)

# How to run
### a) Development mode

1) Start the backend

```$ mvn spring-boot:run "-Dspring-boot.run.profiles=dev" ```

2) Start the frontend

```$ npm start ```

### b) Production mode

1) Compile the application

```$ mvn clean package```

2) Run the generated jar

```$ java -jar "-Dspring.profiles.active=prod" .\spring-boot-angular-backend-0.0.1-SNAPSHOT.jar```
