Imports System.ComponentModel
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports cpcInventory.dbHelper
Imports MySql.Data.MySqlClient

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
'<System.Web.Services.WebService(Namespace:="http://tempuri.org/")> _

<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ToolboxItem(False)>
Public Class appMaster
    Inherits System.Web.Services.WebService

    <WebMethod()>
    Public Function fillDropdown(SqlStr As String, Control As String, groupID As Integer) As List(Of ddown_fill_property)
        Dim TempRec As New DataTable
        Dim ddfProperty As New List(Of ddown_fill_property)()

        SqlStr = SqlStr.Replace("^", "'")
        Try
            Dim cmd As New MySqlCommand(SqlStr)
            If Control = "cmbItem" Then cmd.Parameters.AddWithValue("@im_subgroup", groupID)
            If Control = "cmbLocation" Then cmd.Parameters.AddWithValue("@lcn_group", groupID)
            'If Control = "cmbDealer" Then cmd.Parameters.AddWithValue("@lcn_group", groupID)
            TempRec = dbHelper.SelectData_Parameter(cmd)

            If TempRec.Rows.Count > 0 Then
                For i = 0 To TempRec.Rows.Count - 1
                    ddfProperty.Add(New ddown_fill_property() With {
                                    .ddown_Code = TempRec.Rows(i).Item(0).ToString,
                                    .ddown_desc = TempRec.Rows(i).Item(1).ToString.Replace("'", "^")})
                Next
            End If
        Catch ex As Exception
            TempRec.Dispose()
            TempRec = Nothing
        Finally
            TempRec.Dispose()
            TempRec = Nothing
        End Try
        Return ddfProperty
    End Function
    <WebMethod()>
    Public Function getLocation(SqlStr As String, locationID As Integer) As List(Of misMaster)
        Dim TempRec As New DataTable
        Dim masterProperty As New List(Of misMaster)()

        SqlStr = SqlStr.Replace("^", "'")
        Try
            Dim cmd As New MySqlCommand(SqlStr)
            cmd.Parameters.AddWithValue("@lcn_code", locationID)
            TempRec = dbHelper.SelectData_Parameter(cmd)

            If TempRec.Rows.Count > 0 Then
                For i = 0 To TempRec.Rows.Count - 1
                    masterProperty.Add(New misMaster() With {
                                    .icn_address = TempRec.Rows(i).Item("icn_address").ToString.Replace("'", "^"),
                                    .ic_type = TempRec.Rows(i).Item("lc_type").ToString.Replace("'", "^"),
                                    .icn_group = TempRec.Rows(i).Item("lcn_group").ToString.Replace("'", "^"),
                                    .icn_active = TempRec.Rows(i).Item("lcn_active").ToString.Replace("'", "^")})
                Next
            End If
        Catch ex As Exception
            TempRec.Dispose()
            TempRec = Nothing
        Finally
            TempRec.Dispose()
            TempRec = Nothing
        End Try
        Return masterProperty
    End Function
    <WebMethod()>
    Public Function getmax_GID(SqlStr As String) As Long
        Dim TempRec As New DataTable
        Dim maxGroup_ID As Long = 0

        SqlStr = SqlStr.Replace("^", "'")
        Try
            Dim cmd As New MySqlCommand(SqlStr)
            TempRec = dbHelper.SelectData_Parameter(cmd)

            If TempRec.Rows.Count > 0 Then maxGroup_ID = Val(TempRec.Rows(0).Item("maxGroupID").ToString)
        Catch ex As Exception
            TempRec.Dispose()
            TempRec = Nothing
        Finally
            TempRec.Dispose()
            TempRec = Nothing
        End Try
        Return maxGroup_ID
    End Function
    <WebMethod()>
    Public Function saveLocation(locationID As Long, shortDesc As String, locAddress As String, locType As String, locGroup As Integer, locActive As Integer) As String
        Dim TempRec As New DataTable
        Dim Result As String = ""

        Dim SqlStr As String = ""

        If shortDesc.Trim.Length <= 0 Then
            SqlStr = "Update location set " &
                     "icn_address = @icn_address, lc_type = @lc_type, lcn_active = @lcn_active, lcn_group = @lcn_group " &
                     "Where lcn_code = @lcn_code"
        ElseIf shortDesc.Trim.Length > 0 Then
            SqlStr = "Insert into location (lcn_desc, icn_address, lc_type, lcn_group, lcn_active) " &
                     "values (@lcn_desc, @icn_address, @lc_type, @lcn_group, @lcn_active)"
        End If

        Try
            Dim cmd As New MySqlCommand(SqlStr)
            IIf(shortDesc.Trim.Length <= 0, cmd.Parameters.AddWithValue("@lcn_code", locationID), "")
            IIf(shortDesc.Trim.Length > 0, cmd.Parameters.AddWithValue("@lcn_desc", shortDesc), "")
            cmd.Parameters.AddWithValue("@icn_address", locAddress)
            cmd.Parameters.AddWithValue("@lc_type", locType)
            cmd.Parameters.AddWithValue("@lcn_group", locGroup)
            cmd.Parameters.AddWithValue("@lcn_active", locActive)
            Result = executeDML(cmd)
            If Result = "Success" Then Result = "Transaction save successfully"
        Catch ex As Exception

        Finally

        End Try
        Return Result
    End Function
End Class