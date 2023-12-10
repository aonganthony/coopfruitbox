using coopfruitbox.Services;
using Microsoft.AspNetCore.SignalR;
public interface IGameHub
{
    Task ReceiveCursor(int x, int y, bool down, bool up);
    Task JoinLobby(string lobbyCode, bool host);
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

        public async Task DisplayCursor(int x, int y, bool down, bool up)
        {
            // pass in lobbycode as group name
            // await Clients.OthersInGroup(lobbyCode).ReceiveCursor(...)

            await Clients.Others.ReceiveCursor(x, y, down, up);
        }

        public string CreateLobby()
        {
            Console.WriteLine("here in gamehub");
            string lobbyCode = _gameService.CreateLobby(Context.ConnectionId);
            Console.WriteLine(lobbyCode);
            return lobbyCode;
        }

        public void JoinLobby(string lobbyCode, bool host)
        {
            // verify lobbyCode is real lobby
            if (host) {
                // insert Context.ConnectionID to hostID column
            }
            else {
                // insert into clientID column
            }
            Groups.AddToGroupAsync(Context.ConnectionId, lobbyCode);
        }
    }
}
