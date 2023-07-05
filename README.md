![CoverLarge](https://github.com/SrOliver202023/iStoq/assets/69410605/89cfae50-d4d2-4568-9f8d-f9fb06596cf8)

> # Features

### Auth
* It should be possible to create a register
* It must be possible to login
* It must be possible for the user to logout

### Supplier
* The user must be able to register suppliers
* User must be able to list suppliers
* User must be able to update suppliers
* User must be able to delete suppliers
* The user must be able to search for suppliers

### Product
* The user must be able to register products
* User must be able to list products
* User must be able to update products
* User must be able to delete products
* User must be able to search for products

### Requeriments:
* WSL or Linux
* Docker and Docker composer or SGBD Mysql
* php-cli v8.1
* nodejs v.18.16.1

## Install nodejs
    sudo apt update
    curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    sudo npm install -g n
    sudo n 18.16.1

## Install php
    sudo apt install php-cli
    sudo apt-get install php-xml

## Install composer
    sudo apt install composer

## Install dependences
    npm install
    composer install
## Up docker-compose
    docker-composer up -d
## Run as dev
    npm run dev
    php artisan serve


