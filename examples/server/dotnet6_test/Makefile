# Incomplete - need to dockerize this

run: Program.cs
	dotnet run
Program.cs:
	dotnet new web
dotnet:
	wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb &&\
	sudo dpkg -i packages-microsoft-prod.deb &&\
	rm packages-microsoft-prod.deb &&\
	sudo apt-get update &&\
	sudo apt-get install -y apt-transport-https &&\
	sudo apt-get update &&\
	sudo apt-get install -y dotnet-sdk-6.0 &&\
	true
clean:
	rm -rf \
		bin \
		obj \
		Pages \
		Properties \
		Controllers \
		wwwroot \
		appsettings.* \
		*.csproj \
		Program.cs \
		WeatherForecast.cs \
	true


