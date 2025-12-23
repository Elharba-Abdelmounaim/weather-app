FROM php:8.2-apache

COPY src/ /var/www/html/

RUN docker-php-ext-install mysqli
CMD ["apache2-foreground"]


EXPOSE 80
