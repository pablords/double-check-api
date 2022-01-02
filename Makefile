.PHONY: build push pull run
build:
	docker build -t unity.servehttp.com:5000/double-check-api:master --no-cache .
push:
	docker push unity.servehttp.com:5000/double-check-api:master && docker push unity.servehttp.com:5000/double-check-api-database:master
pull:
	docker pull unity.servehttp.com:5000/double-check-api:master && docker pull unity.servehttp.com:5000/double-check-api-database:master
run:
	docker run unity.servehttp.com:5000/double-check-api:master


