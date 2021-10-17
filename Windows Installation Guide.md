# Step by Step guide to install everything for this course: Windows Edition

## 1) Installing Intellij Idea

- Head over to https://www.jetbrains.com/idea/download/#section=windows to download an idea for java and run the installer.

## 2) Installing Java SE Development Kit 11.0.12 & Maven

- Go to https://www.oracle.com/java/technologies/downloads/#java11-windows and download the .exe jdk file as indicated below. Click on the exe file once it is downloaded and follow the installer.

![image-20211015191141200](C:\Users\agius\AppData\Roaming\Typora\typora-user-images\image-20211015191141200.png)

- Please follow https://mkyong.com/maven/how-to-install-maven-in-windows/ to install maven and setup maven on your windows pc 

## 3) Visual Studio Code

- Download visual studio code, we shall be using this editor to write a docker file / docker-compose file. https://code.visualstudio.com/

## 4) Docker on Windows

- First we need to install WSL2 on our windows machine. Windows subsystem linux will enable us to have a linux subsystem while still running windows. We shall be using WSL2 to install docker on windows.
  1) Download WSL2 following this guide: https://pureinfotech.com/install-windows-subsystem-linux-2-windows-10/
  2) Download Docker Desktop for windows. https://www.docker.com/products/docker-desktop
  3) When Starting the Installation for docker desktop, make sure that `Install required Windows components for WSL2` is enabled.

![image-20211015193053434](C:\Users\agius\AppData\Roaming\Typora\typora-user-images\image-20211015193053434.png)

4. Testing that Docker has been installed correctly.

   - Open `command prompt` on windows and type in `docker run hello-world`. If the installation has been done successfully, you shall see a similar generated message.

   - I shall explain in the course what is happening here :) 

     ```bash
     Hello from Docker!                                                                            
     This message shows that your installation appears to be working correctly.                                   To generate this message, Docker took the following steps:                                     
     1. The Docker client contacted the Docker daemon.                                             
     2. The Docker daemon pulled the "hello-world" image from the Docker Hub.                        
     3. The Docker daemon created a new container from that image which runs the executable that produces the output you are currently reading.                                 
     4. The Docker daemon streamed that output to the Docker client, which sent it to your terminal.                                                                                                                          To try something more ambitious, you can run an Ubuntu container with:                         
     $ docker run -it ubuntu bash                                                                                 Share images, automate workflows, and more with a free Docker ID:                            https://hub.docker.com/                                                                                      For more examples and ideas, visit:                                                         https://docs.docker.com/get-started/
     ```

     

# Ask for help

- Please if you have any questions just talk to me on teams and I can guide you through the whole installation process!