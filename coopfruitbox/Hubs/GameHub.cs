using coopfruitbox.Services;
using Microsoft.AspNetCore.SignalR;
public interface IGameHub
{
    Task OtherPlayerConnected();
    Task ReceiveClientData(string data);
    Task ReceiveHostData(string data);
}

namespace coopfruitbox.Hubs
{
    public class GameHub : Hub<IGameHub>
    {
        private readonly IGameService _gameService;

        public GameHub(IGameService gameService)
        {
            _gameService = gameService;
        }

        public async Task SendClientData(string lobbyID, string data)
        {
            Console.WriteLine("client sending {0}", data);
            await Clients.OthersInGroup(lobbyID).ReceiveClientData(data);
        }

        public async Task SendHostData(string lobbyID, string data)
        {
            Console.WriteLine("host sending {0}", data);
            await Clients.OthersInGroup(lobbyID).ReceiveHostData(data);
        }

        public string CreateLobby()
        {
            string lobbyCode = _gameService.CreateLobby(Context.ConnectionId);
            Console.WriteLine(String.Format("Lobby {0} created by gameService", lobbyCode));
            return lobbyCode;
        }

        public async Task JoinLobby(string lobbyCode, bool client)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, lobbyCode);
            if (client) {
                _gameService.UpdateClientID(lobbyCode, Context.ConnectionId);
                await Clients.Group(lobbyCode).OtherPlayerConnected();
            }
        }
    }
}
