# Guide to Install everything for this course on Ubuntu Linux.



## 1 ) Installing Intellij Idea

- Install Intellij either from this link : https://www.jetbrains.com/idea/download/#section=linux or from the ubuntu software center.

## 2) Installing Java SE Development Kit 11.0.12 

- Run the command below in your terminal to install java 11.

```java
sudo apt-get install openjdk-11-jdk
```

- To check that installation was successful type the below command in your terminal.

```bash
java -version
```

## 3) Installing Maven

- To install maven, open your terminal and paste the following command:

```bash
sudo apt update &&
sudo apt upgrade &&
sudo apt install maven
```

## 4) Installing Visual Studio Code

- Download Visual studio code by using this link: or by using the following command:

```bash
sudo snap install --classic code
```

## 5) Installing Docker

- Setting up the docker installation repository on your ubuntu machine run the below commands one by one.

```bash
sudo apt-get update
 
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
    
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

```

- Install Docker Engine by executing the following commands one by one.

```bash
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo docker run hello-world 
```

- Add docker from the list of sudoers, execute the following command one by one.

```bash
sudo groupadd docker

sudo usermod -aG docker $USER

newgrp docker
```

- To test if docker can now run without `sudo` , execute this command.  If it was not added successfully, it will display an error that you need to use sudo to connect to the docker daemon. 

```bash
docker run hello-world
```

