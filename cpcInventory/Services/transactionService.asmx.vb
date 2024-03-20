Imports System.ComponentModel
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports cpcInventory.dbHelper
Imports MySql.Data.MySqlClient

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
<System.Web.Script.Services.ScriptService()>
<System.Web.Services.WebService(Namespace:="http://tempuri.org/")>
<System.Web.Services.WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)> _
<ToolboxItem(False)> _
Public Class transactionService
    Inherits System.Web.Services.WebService

    <WebMethod()>
    Public Function getItem(itemCode As Long, locationCode As Long, dealerCode As Long) As List(Of item_property)
        Dim TempRec As New DataTable
        Dim itemProperty As New List(Of item_property)()

        Dim SqlStr As String = "select ig_desc, is_desc, im_desc, im_make, im_uom, im_hsn_code, total_purchase, current_stock_total, current_stock_location, current_stock_dealer " &
                               "from item_group B, item_subgroup C, item_master A " &
                               "left outer join(select in_item, sum(in_quantity) as total_purchase from inventory where in_location_id in (select lcn_code from location where lcn_group in (select lcn_group from location where lcn_code = @locationCode)) and in_transaction_type in (1, 2) group by in_item) D on D.in_item = A.im_code " &
                               "left outer join(select in_item, sum(in_quantity) as current_stock_total from inventory where in_location_id in (select lcn_code from location where lcn_group in (select lcn_group from location where lcn_code = @locationCode)) group by in_item) E on E.in_item = A.im_code " &
                               "left outer join(select in_item, sum(in_quantity) as current_stock_location from inventory where in_location_id = @locationCode group by in_item) F on F.in_item = A.im_code " &
                               "left outer join(select in_item, sum(in_quantity) as current_stock_dealer from inventory where in_location_id = @dealerCode group by in_item) G on G.in_item = A.im_code " &
                               "where A.im_subgroup = C.is_code and B.ig_code = C.is_group and A.im_code = @itemCode;"
        SqlStr = SqlStr.Replace("^", "'")
        Try
            Dim cmd As New MySqlCommand(SqlStr)
            cmd.Parameters.AddWithValue("@itemCode", itemCode)
            cmd.Parameters.AddWithValue("@locationCode", locationCode)
            cmd.Parameters.AddWithValue("@dealerCode", dealerCode)
            TempRec = dbHelper.SelectData_Parameter(cmd)

            If TempRec.Rows.Count > 0 Then
                For i = 0 To TempRec.Rows.Count - 1
                    itemProperty.Add(New item_property() With {
                                    .itemGroup = TempRec.Rows(i).Item("ig_desc").ToString.Replace("'", "^"),
                                    .itemSubGroup = TempRec.Rows(i).Item("is_desc").ToString.Replace("'", "^"),
                                    .itemDesc = TempRec.Rows(i).Item("im_desc").ToString.Replace("'", "^"),
                                    .itemMake = TempRec.Rows(i).Item("im_make").ToString.Replace("'", "^"),
                                    .itemUOM = TempRec.Rows(i).Item("im_uom").ToString.Replace("'", "^"),
                                    .itemHSN = TempRec.Rows(i).Item("im_hsn_code").ToString.Replace("'", "^"),
                                    .itemLStock = TempRec.Rows(i).Item("current_stock_location").ToString.Replace("'", "^"),
                                    .itemTStock = TempRec.Rows(i).Item("current_stock_total").ToString.Replace("'", "^"),
                                    .itemPurchased = TempRec.Rows(i).Item("total_purchase").ToString.Replace("'", "^"),
                                    .itemDStock = TempRec.Rows(i).Item("current_stock_dealer").ToString.Replace("'", "^")})
                Next
            End If
        Catch ex As Exception
            TempRec.Dispose()
            TempRec = Nothing
        Finally
            TempRec.Dispose()
            TempRec = Nothing
        End Try
        Return itemProperty
    End Function
    <WebMethod()>
    Public Function doTransaction(itemCode As Long, trnDate As String, trnType As Integer, locID As Integer, dealerID As Integer, trnQuantity As Long, crUser As String) As String
        Dim TempRec As New DataTable
        Dim Result As String = ""

        Dim SqlStr As String = "insert into inventory (in_item, in_date, in_transaction_type, in_location_id, in_dealer, in_quantity, in_accept, in_cr_user) " &
                               "values (@in_item, @in_date, @in_transaction_type, @in_location_id, @in_dealer, @in_quantity, 0, @in_cr_user)"
        Try
            Dim cmd As New MySqlCommand(SqlStr)
            cmd.Parameters.AddWithValue("@in_item", itemCode)
            cmd.Parameters.AddWithValue("@in_date", trnDate)
            cmd.Parameters.AddWithValue("@in_transaction_type", trnType)
            cmd.Parameters.AddWithValue("@in_location_id", locID)
            If trnType = 1 Or trnType = 3 Then cmd.Parameters.AddWithValue("@in_dealer", dealerID)
            If trnType = 2 Then cmd.Parameters.AddWithValue("@in_dealer", 0)
            cmd.Parameters.AddWithValue("@in_quantity", trnQuantity * IIf((trnType = 1 Or trnType = 3), -1, 1))
            cmd.Parameters.AddWithValue("@in_cr_user", crUser)
            Result = executeDML(cmd)

            If trnType = 1 Or trnType = 3 Then
                Dim cmd1 As New MySqlCommand(SqlStr)
                cmd1.Parameters.AddWithValue("@in_item", itemCode)
                cmd1.Parameters.AddWithValue("@in_date", trnDate)
                cmd1.Parameters.AddWithValue("@in_transaction_type", trnType)
                cmd1.Parameters.AddWithValue("@in_dealer", locID)
                cmd1.Parameters.AddWithValue("@in_location_id", dealerID)
                cmd1.Parameters.AddWithValue("@in_quantity", trnQuantity)
                cmd1.Parameters.AddWithValue("@in_cr_user", crUser)
                Result = executeDML(cmd1)
            End If
        Catch ex As Exception

        Finally

        End Try
        Return Result
    End Function
    <WebMethod()>
    Public Function getLogin(SqlStr As String, userID As String, userPWD As String) As List(Of userLogin)
        Dim TempRec As New DataTable
        Dim userProperty As New List(Of userLogin)()

        SqlStr = SqlStr.Replace("^", "'")
        Try
            Dim cmd As New MySqlCommand(SqlStr)
            cmd.Parameters.AddWithValue("@um_user_id", userID)
            cmd.Parameters.AddWithValue("@um_password", userPWD)
            TempRec = dbHelper.SelectData_Parameter(cmd)

            If TempRec.Rows.Count > 0 Then
                For i = 0 To TempRec.Rows.Count - 1
                    userProperty.Add(New userLogin() With {
                                    .userName = TempRec.Rows(i).Item("um_name").ToString.Replace("'", "^"),
                                    .userGroup = TempRec.Rows(i).Item("um_user_group").ToString,
                                    .userActive = TempRec.Rows(i).Item("um_active").ToString})
                Next
            End If
        Catch ex As Exception
            TempRec.Dispose()
            TempRec = Nothing
        Finally
            TempRec.Dispose()
            TempRec = Nothing
        End Try
        Return userProperty
    End Function
    <WebMethod()>
    Public Function checkOutbound(SqlStr As String, location As Long, dealer As Long) As Integer
        Dim TempRec As New DataTable
        Dim Result As Integer = 0
        SqlStr = SqlStr.Replace("^", "'")
        Try
            Dim cmd As New MySqlCommand(SqlStr)
            cmd.Parameters.AddWithValue("@location", location)
            cmd.Parameters.AddWithValue("@dealer", dealer)
            TempRec = dbHelper.SelectData_Parameter(cmd)

            If TempRec.Rows.Count > 0 Then
                Result = TempRec.Rows.Count
            End If
        Catch ex As Exception
            TempRec.Dispose()
            TempRec = Nothing
        Finally
            TempRec.Dispose()
            TempRec = Nothing
        End Try
        Return Result
    End Function
End Class