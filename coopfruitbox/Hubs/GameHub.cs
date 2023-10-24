using Microsoft.AspNetCore.SignalR;
public interface IChatClient
{
    Task receiveCursor(int x, int y); 
    Task receiveSelectionBox(int smallX, int smallY, int bigX, int bigY);
    // Task receiveFruitsHighlighted();
}

namespace coopfruitbox.Hubs
{
    public class GameHub : Hub<IChatClient>
    {
        public async Task displayCursor(int x, int y)
        {
            await Clients.All.receiveCursor(x, y);
        }
    }
}

