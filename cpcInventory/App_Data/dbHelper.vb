Imports System.Data
Imports System.IO
Imports MySql.Data.MySqlClient


Public Class dbHelper
    Public Shared SQLConnection_String_QAS As String = "server=127.0.0.1;uid=root;pwd=root;database=cpcinventory"
    'Public Shared SQLConnection_String_QAS As String = ConfigurationManager.AppSettings("SQLConnection")
    Public Shared SQLConnection_String_POD As String = ""
    Public Shared errorMessage As String = ""

    Public Shared Function SelectData_Parameter(ByVal cmd As MySqlCommand) As DataTable
        Dim Result As DataTable = New DataTable

        Dim con As New MySqlConnection(IIf(ConfigurationManager.AppSettings("appEnv") = "P", SQLConnection_String_POD, SQLConnection_String_QAS))
        Dim sda As New MySqlDataAdapter
        cmd.CommandType = CommandType.Text
        cmd.Connection = con
        Try
            con.Open()
            sda.SelectCommand = cmd
            sda.Fill(Result)
            Return Result
        Catch ex As Exception
            Console.WriteLine(ex.Message.ToString)
            errorMessage = ex.Source.ToString & ", " & ex.Message.ToString
            Return Nothing
        Finally
            con.Close()
            sda.Dispose()
            con.Dispose()
        End Try
    End Function

    Public Shared Function executeDML(ByVal cmd As MySqlCommand) As String
        Dim Result As String = ""
        Dim reGen_SQL As String = ""
        Try
            Dim con As New MySqlConnection(IIf(ConfigurationManager.AppSettings("appEnv") = "P", SQLConnection_String_POD, SQLConnection_String_QAS))
            Dim sda As New MySqlDataAdapter
            cmd.CommandType = CommandType.Text
            cmd.Connection = con

            con.Open()
            sda.SelectCommand = cmd
            cmd.ExecuteNonQuery()
            con.Close()
            Result = "Success"
        Catch ex As Exception
            Result = ex.Message.ToString
        End Try
        Return Result
    End Function
End Class
