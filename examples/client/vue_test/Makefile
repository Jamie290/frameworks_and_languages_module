DOCKER_IMAGE:=vue_nginx_test

run_local: vue.global.js
	python3 -m http.server 8001
vue.global.js:
	curl https://unpkg.com/vue@3/dist/vue.global.js -L -o vue.global.js

build:
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm --publish 8001:80 ${DOCKER_IMAGE}
