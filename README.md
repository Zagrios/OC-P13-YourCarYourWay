# Your Car Your Way - POC

This project uses Angular 16 for the Front-End, and the Back-End is divided into multiple services using SpringBoot 3.5.

<details>
  <summary>POC Architecture preview</summary>

![Diagramme Technique drawio (2) (en)](https://github.com/Zagrios/OC-P13-YourCarYourWay/assets/40181755/f79d7947-a73b-4592-a43b-8c98b17679b4)


</details>

## Requirements
- Ensure you have [Docker Engine](https://docs.docker.com/engine/install/) installed.

## Installation
### 1. Clone the Repository
> git clone https://github.com/Zagrios/OC-P13-YourCarYourWay.git

### 2. Start the Application
The repository contains a `docker-compose.yml` file that will build and run all the services (MySQL Databases, SpringBoot services, and the Angular app).\
To start the application, navigate to the root folder of the cloned repository and execute `docker-compose up`.

## Using the Application
Once everything is started with Docker, you can access `http://localhost:80` start create accounts and chatting.\
Note: For this POC, accounts with the username `admin` will automatically be assigned the `ADMIN` role and be able to view all tickets created by users.

<details>
  <summary>Preview of the website</summary>

![image](https://github.com/Zagrios/OC-P13-YourCarYourWay/assets/40181755/ded7e885-71c4-4373-b352-14f0e9bbb5ec)

![image](https://github.com/Zagrios/OC-P13-YourCarYourWay/assets/40181755/c63a501e-da5e-41d6-a654-1a94753df4d7)
  
</details>
