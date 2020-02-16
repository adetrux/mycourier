#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Services/Users/Users.Api/Users.Api.csproj", "Services/Users/Users.Api/"]
RUN dotnet restore "Services/Users/Users.Api/Users.Api.csproj"
COPY . .
WORKDIR "/src/Services/Users/Users.Api"
RUN dotnet build "Users.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh
RUN dotnet publish "Users.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Users.Api.dll"]