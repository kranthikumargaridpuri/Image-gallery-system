# Image Gallery System - Production Ready Full Stack Project

## Includes
- Spring Boot Java 8 backend
- Angular 8 frontend
- JWT login/register
- Admin dashboard
- Image upload and delete
- Category management
- User gallery search/category filter
- Cart module
- MySQL database
- Docker setup
- SQL file
- Postman collection

## Default Admin Login
Email: `admin@gallery.com`
Password: `admin123`

## Run Backend Locally
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
Backend: `http://localhost:8080`

## Run Frontend Locally
```bash
cd frontend
npm install
npm start
```
Frontend: `http://localhost:4200`

## MySQL
Create database:
```sql
CREATE DATABASE image_gallery;
```
Default DB username/password in `application.properties` is `root/root`.

## Run with Docker
```bash
docker-compose up --build
```

## Production Notes
Before deployment:
1. Change `JWT_SECRET`.
2. Change DB password.
3. Set `CORS_ORIGINS` to your live frontend domain.
4. Store uploads on cloud storage or persistent server volume.
5. Build Angular using `npm run build`.

## Important API URLs
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/categories`
- POST `/api/categories` Admin
- GET `/api/images`
- GET `/api/images/search?keyword=value`
- GET `/api/images/category/{id}`
- POST `/api/admin/images` Admin multipart upload
- DELETE `/api/admin/images/{id}` Admin
- GET `/api/cart`
- POST `/api/cart/{imageId}`
- DELETE `/api/cart/{imageId}`
