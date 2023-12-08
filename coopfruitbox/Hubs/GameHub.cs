using coopfruitbox.Services;
using Microsoft.AspNetCore.SignalR;
public interface IGameHub
{
    Task ReceiveCursor(int x, int y, bool down, bool up);
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
            await Clients.Others.ReceiveCursor(x, y, down, up);
        }

        public string CreateLobby()
        {
            Console.WriteLine("here in gamehub");
            string gameID = _gameService.CreateLobby(Context.ConnectionId);
            Console.WriteLine(gameID);
            return gameID;
        }
    }
}
