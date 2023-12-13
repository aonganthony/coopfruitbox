using coopfruitbox.Services;
using Microsoft.AspNetCore.SignalR;
public interface IGameHub
{
    Task ReceiveCursor(int x, int y, bool down, bool up);
    Task JoinLobby(string lobbyCode, bool client);
    Task OtherPlayerConnected();
    // TODO: separate ReceiveCursor into ReceiveMove, ReceivePress, ReceiveDepress
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

        public async Task DisplayCursor(string lobbyID, int x, int y, bool down, bool up)
        {
            // pass in lobbycode as group name
            // await Clients.OthersInGroup(lobbyCode).ReceiveCursor(...)
            await Clients.OthersInGroup(lobbyID).ReceiveCursor(x, y, down, up);
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
