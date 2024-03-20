<%@ Page Title="Home Page" Language="VB" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.vb" Inherits="cpcInventory._Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <header>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </header>

    <div style="overflow-y: auto; height: 74vh">
        <div class="container-fluid">
            <div class="row">
                <%--<button type="button" id="btnSave" onclick="saveTransaction(txtDate.value,lblUser.innerHTML,cmbLocation.value,cmbItem.value,cmbTransaction.value,cmbDealer.value,txtQuantity.value);" class="btn btn-outline-secondary btn-flat btn-sm" style="height: 78%">
    <i class="fas fa-save"></i>Save--%>
            </div>
            <div class="row">
                <%--<div style="overflow-y:auto; height:65vh">--%>
                <div class="col-sm-4">
                    <div class="card card-purple card-outline">
                        <table class="container-fluid table table-borderless ">
                            <tr class="row col-12">
                                <td style="width: 40%">Date</td>
                                <td style="width: 60%">
                                    <div>
                                        <input id="txtDate" type="date" placeholder="yyyy-MM-dd" class="form-control rounded-0 border-1" style="background-color: white;">
                                    </div>
                                </td>
                            </tr>
                            <tr class="row col-12">
                                <td style="width: 40%">User</td>
                                <td style="width: 60%">
                                    <div><span class="form-control rounded-0 border-1" id="lblUser"></span></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card card-purple card-outline">
                        <table class="container-fluid table table-borderless">
                            <tr class="row col-12">
                                <td style="width: 40%">Source</td>
                                <td style="width: 60%">
                                    <div class="d-flex">
                                        <select id="cmbLocation" onchange="locationChange();getItem_details(cmbItem.value, cmbLocation.value, cmbDealer.value);lockDealercmb_item();checkOutbound(cmbLocation.value,cmbDealer.value)" class="custom-select form-control rounded-0 border-1">
                                        </select>
                                        <button type="button" id="Button2" class="btn-flat rounded-0" title="Add new source" style="font-size: medium; background-color: indigo; color: white" onclick="createLocation()">
                                            <i class="fa fa-plus-square"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="row col-12">
                                <td style="width: 40%">Destinantion</td>
                                <td colspan="2" style="width: 60%">
                                    <div class="d-flex">
                                        <select id="cmbDealer" class="custom-select form-control rounded-0 border-1" onchange="checkOutbound(cmbLocation.value,cmbDealer.value);getItem_details(cmbItem.value, cmbLocation.value, cmbDealer.value);">
                                        </select>
                                        <button type="button" id="Button5" class="btn-flat rounded-0" title="Add new destination" style="font-size: medium; background-color: indigo; color: white" onclick="underDev()">
                                            <i class="fa fa-plus-square"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card card-purple card-outline">
                        <table class="container-fluid table table-borderless">
                            <tr class="row col-12">
                                <td style="width: 40%">Group</td>
                                <td style="width: 60%">
                                    <div class="d-flex">
                                        <select id="cmbGroup" onchange="fillDropdown_cmbItem(cmbGroup.value)" class="custom-select form-control rounded-0 border-1">
                                        </select>
                                        <button type="button" id="Button3" class="btn-flat rounded-0" title="Add new group" style="font-size: medium; background-color: indigo; color: white" onclick="underDev()">
                                            <i class="fa fa-plus-square"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr class="row col-12">
                                <td style="width: 40%">Item</td>
                                <td style="width: 60%">
                                    <div class="d-flex">
                                        <select id="cmbItem" onchange="getItem_details(cmbItem.value, cmbLocation.value, cmbDealer.value)" class="custom-select form-control rounded-0 border-1">
                                        </select>
                                        <button type="button" id="Button4" class="btn-flat rounded-0" title="Add new item" style="font-size: medium; background-color: indigo; color: white" onclick="underDev()">
                                            <i class="fa fa-plus-square"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="card card-purple card-outline">
                        <div class="d-flex">
                            <div class="col-lg-12">
                                <div class="card" style="margin-top: 1vh">
                                    <div class="card-header">
                                        <h5 class="m-0"><span id="lblItem">Item :</span></h5>
                                    </div>
                                    <div class="card-body">
                                        <table class="container-fluid table table-striped text-nowrap">
                                            <tr class="row col-12">
                                                <td class="col-5">Group</td>
                                                <td class="col-1">:</td>
                                                <td class="col-6"><span id="lblItemGroup"></span></td>
                                            </tr>
                                            <tr class="row col-12">
                                                <td class="col-5">Sub Group</td>
                                                <td class="col-1">:</td>
                                                <td class="col-6"><span id="lblItemSubGroup"></span></td>
                                            </tr>
                                            <tr class="row col-12">
                                                <td class="col-5">Make</td>
                                                <td class="col-1">:</td>
                                                <td class="col-6"><span id="lblItemMake"></span></td>
                                            </tr>
                                            <tr class="row col-12">
                                                <td class="col-5">UOM</td>
                                                <td class="col-1">:</td>
                                                <td class="col-6"><span id="lblUOM"></span></td>
                                            </tr>
                                            <tr class="row col-12">
                                                <td class="col-5">HSN Code</td>
                                                <td class="col-1">:</td>
                                                <td class="col-6"><span id="lblHSN"></span></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="m-0">Inbounds</h5>
                                            </div>
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="m-0">Outbounds</h5>
                                            </div>
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="m-0">Stock Position</h5>
                                            </div>
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card">
                                            <div class="card-header">
                                                <h5 class="m-0">Item Configuration</h5>
                                            </div>
                                            <div class="card-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <%--<table class="container-fluid table table-borderless">
                            <tr class="row col-12">                                
                                <td colspan="2" style="width: 40%">
                                    
                                        <span id="lbllStuck">Location Stock : </span>
                                        <br />
                                        <span id="lbltStuck">Total Stock : </span>
                                        <hr />
                                        <span id="lblPurchased">Purchased : </span>
                                        <br />
                                        <span id="lbldStuck">Dealer/Store Stock : </span>
                                </td>
                                <td style="width: 60%">
                                   
                                </td>
                            </tr>
                        </table>--%>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="card card-purple card-outline">
                        <table class="container-fluid table table-borderless">
                            <tr class="row col-12">
                                <td style="width: 40%">Transaction</td>
                                <td colspan="2" style="width: 60%">
                                    <div>
                                        <select id="cmbTransaction" class="custom-select form-control rounded-0 border-1" onchange="inboundTransaction()">
                                            <option value="0" disabled selected>SELECT</option>
                                            <option value="1">STOCK TRANSFER</option>
                                            <option value="2">IN BOUND</option>
                                            <option value="3">OUT BOUND</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr class="row col-12">
                                <td style="width: 40%">Quantity</td>
                                <td colspan="2" style="width: 60%">
                                    <div>
                                        <input id="txtQuantity" type="number" class="form-control rounded-0 border-1" placeholder="Quantity" autocomplete="off">
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <%--</div>--%>
            </div>
        </div>
    </div>
    <%--<div class="table-responsive" style="height:70vh; overflow-x:hidden; overflow-y:auto;">
                <table id="repoData" class="container-fluid table table-striped">
                    <tr class="row col-12">
                        <td style="width: 40%">Date</td>
                        <td style="width: 60%">
                            <div class="form-control rounded-0">
                                <input id="txtDate" type="date" placeholder="yyyy-MM-dd" class="form-control rounded-0 border-0" style="background-color: white;">
                            </div>
                        </td>
                    </tr>
                    <tr class="row col-12">
                        <td style="width: 40%">User</td>
                        <td style="width: 60%"><div class="form-control rounded-0"><span class="form-control rounded-0 border-0" id="lblUser"></span></div></td>
                    </tr>
                    <tr class="row col-12">
                        <td style="width: 40%">Location</td>
                        <td style="width: 60%">
                            <div class="btn-group form-control rounded-0">
                                <select id="cmbLocation" onchange="locationChange();getItem_details(cmbItem.value, cmbLocation.value, cmbDealer.value);lockDealercmb_item();checkOutbound(cmbLocation.value,cmbDealer.value)" class="custom-select form-control rounded-0 border-0">
                                </select>
                                <button type="button" id="Button2" class="btn btn-outline-secondary btn-flat rounded-0" onclick="createLocation()">
                                    <i class="fas fa-save"></i>New</button>
                            </div>
                        </td>
                    </tr>
                    <tr class="row col-12">
                        <td style="width: 40%">Dealer/Store</td>
                        <td colspan="2" style="width: 60%">
                            <div class="form-control rounded-0">
                                <select id="cmbDealer" class="custom-select form-control rounded-0 border-0" onchange="checkOutbound(cmbLocation.value,cmbDealer.value);getItem_details(cmbItem.value, cmbLocation.value, cmbDealer.value);">
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr class="row col-12">
                        <td style="width: 40%">Group</td>                        
                        <td style="width: 60%">
                            <div class="btn-group form-control rounded-0">
                                <select id="cmbGroup" onchange="fillDropdown_cmbItem(cmbGroup.value)" class="custom-select form-control rounded-0 border-0">
                                </select>
                                <button type="button" id="Button3" class="btn btn-outline-secondary btn-flat rounded-0" onclick="underDev()">
                                    <i class="fas fa-save"></i>New</button>
                            </div>
                        </td>
                    </tr>
                    <tr class="row col-12">
                        <td style="width: 40%">Item</td>
                        <td style="width: 60%">
                            <div class="btn-group form-control rounded-0">
                                <select id="cmbItem" onchange="getItem_details(cmbItem.value, cmbLocation.value, cmbDealer.value)" class="custom-select form-control rounded-0 border-0">
                                </select>
                                <button type="button" id="Button4" class="btn btn-outline-secondary btn-flat rounded-0" onclick="underDev()">
                                    <i class="fas fa-save"></i>New</button>
                            </div>
                        </td>
                    </tr>
                    <tr class="row col-12">
                        <td style="width: 40%">Item Detail</td>
                        <td colspan="2" style="width: 60%">
                            <div class="form-control rounded-0">
                                <span id="lblItemGroup">Group : </span>
                                <br />
                                <span id="lblItemSubGroup">Sub Group : </span>
                                <br />
                                <span id="lblItem">Item : </span>
                                <br />
                                <span id="lblItemMake">Make : </span>
                                <br />
                                <span id="lblUOM">UOM : </span>
                                <br />
                                <span id="lblHSN">HSN Code : </span>
                                <br />
                                <span id="lbllStuck">Location Stock : </span>
                                <br />
                                <span id="lbltStuck">Total Stock : </span>
                                <hr />
                                <span id="lblPurchased">Purchased : </span>
                                <br />
                                <span id="lbldStuck">Dealer/Store Stock : </span>

                            </div>
                        </td>
                    </tr>
                    <tr class="row col-12">
                        <td style="width: 40%">Transaction</td>
                        <td colspan="2" style="width: 60%">
                            <div class="form-control rounded-0">
                                <select id="cmbTransaction" class="custom-select form-control rounded-0 border-0" onchange="inboundTransaction()">
                                    <option value="0" disabled selected>SELECT</option>
                                    <option value="1">STOCK TRANSFER</option>
                                    <option value="2">IN BOUND</option>
                                    <option value="3">OUT BOUND</option>
                                </select>
                            </div>
                        </td>
                    </tr>                    
                    <tr class="row col-12">
                        <td style="width: 40%">Quantity</td>
                        <td colspan="2" style="width: 60%">
                            <div class="form-control rounded-0">
                                <input id="txtQuantity" type="number" class="form-control rounded-0 border-0" placeholder="Quantity" autocomplete="off">
                            </div>
                        </td>
                    </tr>
                </table>
        </div>--%>
    <%--<div id="footer" align="center" style="vertical-align: middle; padding-top: 10px; border-top: 1px solid grey">
            <button type="button" id="btnSave" onclick="saveTransaction(txtDate.value,lblUser.innerHTML,cmbLocation.value,cmbItem.value,cmbTransaction.value,cmbDealer.value,txtQuantity.value);" class="btn btn-outline-secondary btn-flat btn-sm" style="height: 78%">
                <i class="fas fa-save"></i>Save
            </button>            
        </div>--%>


    <div id="userLogin" class="modal fade rounded-0" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog rounded-0 modal-dialog-centered" role="document">
            <div class="modal-content rounded-0">
                <div class="modal-header rounded-0 bg-lightblue">
                    <h4 class="modal-title">Login</h4>
                    <%--<button type="button" data-bs-dismiss="modal" class="btn btn-outline-secondary btn-flat rounded-0" 
                            onclick="checkLogin()">&times;</button>--%>
                </div>
                <div class="modal-body" style="height: 22vh; overflow-y: hidden">
                    <input id="userGroup" type="hidden" value="0" />
                    <table class="table table-borderless">
                        <tr class="row col-12">
                            <td style="width: 40%">User ID</td>
                            <td style="width: 60%">
                                <div>
                                    <input id="txtUser" type="text" placeholder="User ID" class="form-control rounded-0 border-1" style="background-color: white;">
                                </div>
                            </td>
                        </tr>
                        <tr class="row col-12">
                            <td style="width: 40%">Password</td>
                            <td style="width: 60%">
                                <div>
                                    <input id="txtPassword" type="password" placeholder="Password" class="form-control rounded-0 border-1" style="background-color: white;">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <span style="color: red; font-size: smaller;" id="lblLoginmsg" class="form-control rounded-0 border-0"></span>
                <div align="center" class="modal-footer rounded-0">
                    <button type="button" id="btnLogin" class="btn btn-outline-secondary btn-flat btn-sm" onclick="getLogin(txtUser.value,txtPassword.value)" style="height: 78%">Login</button>
                </div>
            </div>
        </div>
    </div>
    <div id="createLocation" class="modal fade rounded-0" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog rounded-0 modal-dialog-centered" role="document">
            <div class="modal-content rounded-0">
                <div class="modal-header rounded-0 bg-lightblue">
                    <h4 class="modal-title">Location</h4>
                    <button type="button" data-bs-dismiss="modal" class="btn btn-outline-secondary btn-flat rounded-0">&times;</button>
                </div>
                <div class="modal-body" style="height: 62vh; overflow-y: hidden">
                    <%--<input id="userGroup" type="hidden" value="0" />--%>
                    <table class="table table-striped table-borderless">
                        <tr class="row col-12">
                            <td style="width: 40%">Location</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <select id="cmbLocation_Select" class="custom-select form-control rounded-0 border-0" onchange="locationMaintenance('')">
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr class="row col-12">
                            <td style="width: 40%">Short Description</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <input id="txtSh_Desc" type="text" placeholder="Short Description" class="form-control rounded-0 border-0" style="background-color: white;" onfocus="this.select();">
                                </div>
                            </td>
                        </tr>
                        <tr class="row col-12">
                            <td style="width: 40%">Address</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <input id="txtAddress" type="text" placeholder="Address" class="form-control rounded-0 border-0" style="background-color: white;" onfocus="this.select();">
                                </div>
                            </td>
                        </tr>
                        <tr class="row col-12">
                            <td style="width: 40%">Type</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <select id="cmbLCType" class="custom-select form-control rounded-0 border-0">
                                        <option value="0" disabled selected>SELECT</option>
                                        <option value="1">STORE</option>
                                        <option value="2">GODOWN</option>
                                        <option value="3">DEALER</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr class="row col-12">
                            <td style="width: 40%">Group ID</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <input id="txtGroup_ID" disabled type="number" placeholder="Group ID" class="form-control rounded-0 border-0" style="background-color: white;">
                                </div>
                            </td>
                        </tr>
                        <tr class="row col-12">
                            <td style="width: 40%">Active/Inactive</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <input id="chkLocation" type="checkbox" style="margin-left: 10px" />
                                </div>
                            </td>

                        </tr>
                    </table>
                </div>
                <span style="color: red; font-size: smaller;" id="lblLocationmsg" class="form-control rounded-0 border-0"></span>
                <div align="center" class="modal-footer rounded-0">
                    <button type="button" id="btnSave_Location" class="btn btn-outline-secondary btn-flat btn-sm" onclick="saveLocation()" style="height: 78%">Save</button>
                </div>
            </div>
        </div>
    </div>
    <div id="createGroup" class="modal fade rounded-0" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog rounded-0 modal-dialog-centered" role="document">
            <div class="modal-content rounded-0">
                <div class="modal-header rounded-0 bg-lightblue">
                    <h4 class="modal-title">Group | Sub-Group</h4>
                    <button type="button" data-bs-dismiss="modal" class="btn btn-outline-secondary btn-flat rounded-0"
                        onclick="checkLogin()">
                        &times;</button>
                </div>
                <div class="modal-body" style="height: 35vh; overflow-y: hidden">
                    <%--<input id="userGroup" type="hidden" value="0" />--%>
                    <table class="table table-striped table-borderless">
                        <tr class="row col-12">
                            <td style="width: 40%">Group</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <select id="cmbGroup_Create" class="custom-select form-control rounded-0 border-0">
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr class="row col-12">
                            <td style="width: 40%">Sub-Group</td>
                            <td style="width: 60%">
                                <div class="form-control rounded-0">
                                    <input id="txtSub_Group_Create" type="text" placeholder="Sub Group" class="form-control rounded-0 border-0" style="background-color: white;">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <span style="color: red; font-size: smaller;" id="lblSubgroup_msg" class="form-control rounded-0 border-0"></span>
                <div align="center" class="modal-footer rounded-0">
                    <button type="button" id="btnCreate_Subgroup" class="btn btn-outline-secondary btn-flat btn-sm" onclick="getLogin(txtUser.value,txtPassword.value)" style="height: 78%">Save</button>
                    <button type="button" id="btnDelete_Subgroup" class="btn btn-outline-danger btn-flat btn-sm" onclick="getLogin(txtUser.value,txtPassword.value)" style="height: 78%">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <script src="Scripts/logicSrc/appMaster.js"></script>
    <script src="Scripts/logicSrc/appTransaction.js"></script>
    <script>         
        $(document).ready(function () {
            checkLogin();
        });

        function pageLoad() {
            document.getElementById("txtDate").valueAsDate = new Date();
            fillDropdown_cmbLocation('cmbLocation', document.getElementById("userGroup").value);
            fillDropdown_cmbDealer('cmbDealer');
            fillDropdown_cmbGroup('cmbGroup');
        }
        function createLocation() {
            fillDropdown_cmbLoc('cmbLocation_Select');
            locationMaintenance('NEW');
            $("#createLocation").modal("show");
        }
        function createSubGroup() {
            $("#createGroup").modal("show");
        }
        function checkLogin() {
            if (document.getElementById("loggedUser").innerHTML.trim().length <= 0) {
                $("#userLogin").modal("show");
            }
        }
    </script>
</asp:Content>
