#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Services/Routes/Routes.Api/Routes.Api.csproj", "Services/Routes/Routes.Api/"]
RUN dotnet restore "Services/Routes/Routes.Api/Routes.Api.csproj"
COPY . .
WORKDIR "/src/Services/Routes/Routes.Api"
RUN dotnet build "Routes.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Routes.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Routes.Api.dll"]