FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:7006
COPY Publish/ .
EXPOSE 7006
ENTRYPOINT ["dotnet","TouramentDetails.dll"]
