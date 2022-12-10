DOCKER_IMAGE:=react_test

run_local: my-app/package.json
	cd my-app ; PORT=8000 npm start
my-app/package.json:
	npx create-react-app my-app
	#node_modules:
build: my-app/package.json
	docker build --tag ${DOCKER_IMAGE} .
run:
	docker run --rm -it --publish 8000:8000 ${DOCKER_IMAGE}
