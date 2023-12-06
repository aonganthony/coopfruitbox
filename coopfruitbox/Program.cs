using coopfruitbox.Hubs;
using coopfruitbox.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddSingleton<IGameService, GameService>();

var app = builder.Build();

app.MapHub<GameHub>("/gameHub");

app.UseFileServer();
app.Run();
