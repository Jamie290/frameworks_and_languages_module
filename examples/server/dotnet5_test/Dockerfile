# https://devblogs.microsoft.com/premier-developer/running-a-net-core-web-application-in-docker-container-using-docker-desktop-for-windows/
FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build-env

    WORKDIR /app

    # Install dependencies
    COPY TodoApi/*.csproj ./
    RUN dotnet restore

    # Copy everything else and build
    COPY TodoApi/ ./
    RUN dotnet publish -c Release -o out

# Build runtime image
# TODO? use runtime?
FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine

    WORKDIR /app

    COPY --from=build-env /app/out .

    EXPOSE 5000
    EXPOSE 5001
    ENV ASPNETCORE_URLS=http://*:5000
    ENTRYPOINT ["dotnet", "TodoApi.dll"]
