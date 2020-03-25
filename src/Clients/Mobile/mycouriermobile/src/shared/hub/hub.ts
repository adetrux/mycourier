import * as signalR from "@microsoft/signalr";

export function useHubConnection(hubUrl: string) {
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

  hubConnection
    .start()
    .then(() => console.log("connection started"))
    .catch(err => console.log("Error occured " + err));

  return hubConnection;
}
