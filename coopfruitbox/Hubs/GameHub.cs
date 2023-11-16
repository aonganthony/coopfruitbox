using Microsoft.AspNetCore.SignalR;
public interface IChatClient
{
    Task receiveCursor(int x, int y, bool down, bool up);
    // Task receiveFruitsHighlighted();
}

namespace coopfruitbox.Hubs
{
    public class GameHub : Hub<IChatClient>
    {
        public async Task DisplayCursor(int x, int y, bool down, bool up)
        {
            await Clients.Others.receiveCursor(x, y, down, up);
        }
    }
}
