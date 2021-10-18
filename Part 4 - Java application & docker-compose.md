```properties
version: '3.1'
services:
  mysql:
    image: mysql:8
    container_name: localhost-mysql
    volumes:
    - ./sql-init/:/docker-entrypoint-initdb.d/
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    expose:
    - 3306
    environment:
      MYSQL_ROOT_PASSWORD: abcdefgh
    ports:
    - 3306:3306
 
    
```

