DOCKER_IMAGE:=hyperapp_test

run_local:
	python3 -m http.server
build:
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm -it --publish 8001:80 ${DOCKER_IMAGE}
