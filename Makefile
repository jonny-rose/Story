build-up: build up

build:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

prepare:
	cp ./.env.example ./.env

open:
	open localhost:3000