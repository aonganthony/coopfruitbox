using coopfruitbox.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

var app = builder.Build();

app.MapHub<GameHub>("/gameHub");

app.UseFileServer();
app.Run();
