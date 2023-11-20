# Stage 1: Build the Spring application
FROM maven:3.8.1-openjdk-17 as builder
COPY . /app
WORKDIR /app
RUN mvn clean package -DskipTests

# Stage 2: Copy the built application to a new image
FROM openjdk:17-jdk-alpine
EXPOSE 8085
COPY --from=builder /app/target/userservice-0.0.1-SNAPSHOT.jar /userservice.jar
ENTRYPOINT ["java","-jar","/userservice.jar"]