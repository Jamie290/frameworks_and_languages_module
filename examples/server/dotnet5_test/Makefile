DOCKER_IMAGE:=csharp_todoapi:latest
DOCKER_IMAGE_BASE:=mcr.microsoft.com/dotnet/sdk:5.0-alpine
USER=$(shell id -u):$(shell id -g)

TodoApi/TodoApi.csproj:
	# https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio-code
	# https://devblogs.microsoft.com/premier-developer/running-a-net-core-web-application-in-docker-container-using-docker-desktop-for-windows/
	# https://stackoverflow.com/questions/53556623/dotnet-build-permission-denied-in-docker-container-running-jenkins
	# https://faun.pub/set-current-host-user-for-docker-container-4e521cef9ffc
	mkdir -p TodoApi && \
	docker run -it --rm \
		--name aspnet \
		--user ${USER} \
		--volume /etc/passwd:/etc/passwd:ro \
		--volume /etc/group:/etc/group:ro \
		--env DOTNET_CLI_HOME="/tmp/DOTNET_CLI_HOME" \
		--env DISABLE_AUTH="true" \
		--env HOME="/tmp" \
		--volume ${PWD}/TodoApi:/TodoApi:rw \
		${DOCKER_IMAGE_BASE} \
			/bin/sh -c "dotnet new webapi --no-https -o TodoApi && cd TodoApi && dotnet add package Microsoft.EntityFrameworkCore.InMemory"


aspnetcore_sample:
	# https://hub.docker.com/_/microsoft-dotnet
	docker run -it --rm -p 8000:80 --name aspnetcore_sample mcr.microsoft.com/dotnet/samples:aspnetapp

build: TodoApi/TodoApi.csproj
	docker build --tag ${DOCKER_IMAGE} .

run:
	docker run -it --rm -p 5000:5000 ${DOCKER_IMAGE}
	# http://localhost:5000/WeatherForecast
