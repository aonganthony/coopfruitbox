using Npgsql;
using System;
using System.Runtime.InteropServices;
using System.Text;

namespace coopfruitbox.Services;

public interface IGameService
{
    string CreateLobby(string hostConnectionID);
    void UpdateClientID(string lobbyCode, string clientConnectionID);

}
public class GameService: IGameService
{
    private readonly string _connectionString;

    public GameService(IConfiguration configuration)
    {
        _connectionString = configuration["ConnectionStrings:DefaultConnection"];
        Console.WriteLine(_connectionString);
    }

    public string GenerateLobbyCode()
    {
        Random rand = new Random();
        StringBuilder builder = new StringBuilder();
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (int i = 0; i < 8; i++)
        {
            int index = rand.Next(chars.Length);
            builder.Append(chars[index]);
        }

        return builder.ToString();
    }

    public string CreateLobby(string hostConnectionID)
    {
        // Create lobby, set userID to host's ID using Context.connectionID
        var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        var lobbyCode = GenerateLobbyCode(); // random 8 letters, caps sensitive
        var cmdstring = string.Format("INSERT INTO Lobbies (Lobbycode, HostUserID, ClientUserID, CreationTime) VALUES ('{0}', '{1}', null, NOW())", lobbyCode, hostConnectionID);
        var command = new NpgsqlCommand(cmdstring, connection);
        command.ExecuteNonQuery();

        // return lobbyCode
        return lobbyCode;
    }

    public void UpdateClientID(string lobbyCode, string clientConnectionID)
    {
        var connection = new NpgsqlConnection(_connectionString);
        connection.Open();

        var cmdstring = string.Format("UPDATE Lobbies SET ClientUserID = '{1}' WHERE LobbyCode = '{0}'", lobbyCode, clientConnectionID);
        var command = new NpgsqlCommand(cmdstring, connection); 
        command.ExecuteNonQuery();
    }
}
