function getItem_details(itemCode, locationCode, dealerCode) {
    var jRes = 0;
    var request;
    var SqlStr = "";

    if (locationCode <= 0 || itemCode <= 0) return;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            var url = "/Services/transactionService.asmx/getItem";
            request.open("POST", url, false);
            var params = "{ itemCode: " + itemCode + ", locationCode: " + locationCode + ", dealerCode: " + dealerCode + "}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    document.getElementById("lblItemGroup").innerHTML = "Group : ";
                    document.getElementById("lblItemSubGroup").innerHTML = "Sub Group : ";
                    document.getElementById("lblItem").innerHTML = "Item : ";
                    document.getElementById("lblItemMake").innerHTML = "Make : ";
                    document.getElementById("lblUOM").innerHTML = "UOM : ";
                    document.getElementById("lblHSN").innerHTML = "HSN Code : ";
                    document.getElementById("lbllStuck").innerHTML = "Location Stock : ";
                    document.getElementById("lbltStuck").innerHTML = "Total Stock : ";
                    document.getElementById("lblPurchased").innerHTML = "Purchased : ";
                    document.getElementById("lbldStuck").innerHTML = "Dealer/Store Stock : ";
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    var count = Object.keys(obj).length;
                    try {
                        if (count == 0) {
                            document.getElementById("lblItemGroup").innerHTML = "Group : ";
                            document.getElementById("lblItemSubGroup").innerHTML = "Sub Group : ";
                            document.getElementById("lblItem").innerHTML = "Item : ";
                            document.getElementById("lblItemMake").innerHTML = "Make : ";
                            document.getElementById("lblUOM").innerHTML = "UOM : ";
                            document.getElementById("lblHSN").innerHTML = "HSN Code : ";
                            document.getElementById("lbllStuck").innerHTML = "Location Stock : ";
                            document.getElementById("lbltStuck").innerHTML = "Total Stock : ";
                            document.getElementById("lblPurchased").innerHTML = "Purchased : ";
                            document.getElementById("lbldStuck").innerHTML = "Dealer/Store Stock : ";
                        } else {
                            document.getElementById("lblItemGroup").innerHTML = "Group : " + obj[0]['itemGroup'];
                            document.getElementById("lblItemSubGroup").innerHTML = "Sub Group : " + obj[0]['itemSubGroup'];
                            document.getElementById("lblItem").innerHTML = "Item : " + obj[0]['itemDesc'];
                            document.getElementById("lblItemMake").innerHTML = "Make : " + obj[0]['itemMake'];
                            document.getElementById("lblUOM").innerHTML = "UOM : " + obj[0]['itemUOM'];
                            document.getElementById("lblHSN").innerHTML = "HSN Code : " + obj[0]['itemHSN'];
                            document.getElementById("lbllStuck").innerHTML = "Location Stock : " + obj[0]['itemLStock'];
                            document.getElementById("lbltStuck").innerHTML = "Total Stock : " + obj[0]['itemTStock'];
                            document.getElementById("lblPurchased").innerHTML = "Purchased : " + obj[0]['itemPurchased'];
                            document.getElementById("lbldStuck").innerHTML = "Dealer/Store Stock : " + obj[0]['itemDStock'];
                        }
                    } catch (e) {
                        jRes = 1;
                        genMessage('Error', e.message)
                    }
                } else {
                    jRes = 1;
                    genMessage('Error', request.status)
                }
            };
            request.send(params);
        }
    } catch (e) {
        jRes = 1;
        genMessage('Error', e.message)
    }
    return jRes;
}
function saveTransaction(trnDate, crUser, locationCode, itemCode, trnType, trnDealer, trnQty) {
    var jRes = 0;
    var request;

    if (locationCode <= 0) {
        genMessage('Error', "Please check location and try again")
        return;
    }
    if (itemCode <= 0) {
        genMessage('Error', "Please select item and try again")
        return;
    }
    if (trnType <= 0) {
        genMessage('Error', "Please select transaction type and try again")
        return;
    }
    if ((trnType == 1 || trnType == 3) && trnDealer <= 0) {
        genMessage('Error', "Please select dealer/store and try again")
        return;
    }
    if (trnQty <= 0) {
        genMessage('Error', "Please check quantity and try again")
        return;
    }

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {            
            var url = "/Services/transactionService.asmx/doTransaction";
            request.open("POST", url, false);
            var params = "{ itemCode: " + itemCode + ", trnDate: '" + trnDate + "', trnType: " + trnType + ", locID: " + locationCode + ", dealerID: " + trnDealer + ", trnQuantity: " + trnQty + ", crUser: '" + crUser + "'}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var json = this.responseText;
                    var finalMsg = JSON.parse(json).d;
                    var msgTitle = "";
                    if (finalMsg === 'Success') {
                        msgTitle = "Save";
                        finalMsg = "Transaction save successfully"
                        releaseControls();
                    } else {
                        msgTitle = "Error";
                    }
                    genMessage(msgTitle, finalMsg);                    
                } else {
                    jRes = 1;
                    genMessage('Error', request.status)
                }
            };
            request.send(params);
        }
    } catch (e) {
        jRes = 1;
        genMessage('Error', e.message)
    }
    return jRes;
}
function getLogin(userID, userPWD) {
    var jRes = 0;
    var request;
    var SqlStr = "";
    document.getElementById("lblLoginmsg").innerHTML = "";
    document.getElementById("userGroup").value = 0;
    document.getElementById("lblUser").innerHTML = "";
    if (userID.trim().length <= 0 || userPWD.trim().length <= 0) {
        document.getElementById("lblLoginmsg").innerHTML = "Please check User ID and Password & try again"
        return;
    }

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'select * from user_master where um_user_id = @um_user_id and um_password = @um_password';

            var url = "/Services/transactionService.asmx/getLogin";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', userID: '" + userID + "', userPWD: '" + userPWD + "'}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    var count = Object.keys(obj).length;
                    try {
                        if (count == 0) {
                            document.getElementById("lblLoginmsg").innerHTML = "Incorrect User ID or Password."
                            return;
                        } else {
                            if (Number(obj[0]['userActive']) <= 0) {
                                document.getElementById("lblLoginmsg").innerHTML = "User is not active, Please contact administrator."
                                return;
                            } else {
                                document.getElementById("userGroup").value = obj[0]['userGroup'];
                                document.getElementById("loggedUser").innerHTML = obj[0]['userName'];
                                document.getElementById("lblUser").innerHTML = obj[0]['userName'];
                                waiting_modal(pageLoad);
                                $("#userLogin").modal("hide");
                            }                            
                        }
                    } catch (e) {
                        jRes = 1;
                        genMessage('Error', e.message)
                    }
                } else {
                    jRes = 1;
                    //genMessage('Error', request.status)
                    waiting_modal(pageLoad);
                    $("#userLogin").modal("hide");
                }
            };
            request.send(params);
        }
    } catch (e) {
        jRes = 1;
        genMessage('Error', e.message)
    }
    return jRes;
}
function lockDealercmb_item() {
    var locationCmb = document.getElementById('cmbLocation');
    var dealerCmb = document.getElementById('cmbDealer');
    var len = dealerCmb.options.length;
    for (i = 0; i < len; i++) {
        if (dealerCmb.options[i].value == locationCmb.value) {
            dealerCmb.options[i].disabled = true;
        } else {
            dealerCmb.options[i].disabled = false;
        }
    }
}
function checkOutbound(location, dealer) {
    var jRes = 0;
    var request;
    var SqlStr = "";

    if (location <= 0 || dealer <= 0) return;
    document.getElementById("cmbTransaction").value = 0;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'SELECT distinct lcn_group FROM location where lcn_code in (@location,@dealer)';

            var url = "/Services/transactionService.asmx/checkOutbound";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', location: " + location + ", dealer: " + dealer + "}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var json = Number(JSON.parse(this.responseText).d);
                    var transactionCmb = document.getElementById('cmbTransaction');
                    if (json > 1) {                        
                        transactionCmb.options[3].disabled = false;
                        transactionCmb.options[1].disabled = true;
                    } else {
                        transactionCmb.options[3].disabled = true;
                        transactionCmb.options[1].disabled = false;
                    };                    
                } else {
                    jRes = 1;
                    genMessage('Error', request.status)
                }
            };
            request.send(params);
        }
    } catch (e) {
        jRes = 1;
        genMessage('Error', e.message)
    }
    return jRes;
}
function releaseControls() {
    document.getElementById("lblItemGroup").innerHTML = "Group : ";
    document.getElementById("lblItemSubGroup").innerHTML = "Sub Group : ";
    document.getElementById("lblItem").innerHTML = "Item : ";
    document.getElementById("lblItemMake").innerHTML = "Make : ";
    document.getElementById("lblUOM").innerHTML = "UOM : ";
    document.getElementById("lblHSN").innerHTML = "HSN Code : ";
    document.getElementById("lbllStuck").innerHTML = "Location Stock : ";
    document.getElementById("lbltStuck").innerHTML = "Total Stock : ";
    document.getElementById("lblPurchased").innerHTML = "Purchased : ";
    document.getElementById("lbldStuck").innerHTML = "Dealer/Store Stock : ";

    document.getElementById("cmbLocation").value = 0;
    document.getElementById("cmbDealer").value = 0;
    document.getElementById("cmbGroup").value = 0;
    document.getElementById("cmbItem").value = 0;
    document.getElementById("cmbTransaction").value = 0;
    document.getElementById("txtQuantity").value = "";
}
function inboundTransaction() {    
    if (Number(document.getElementById("cmbTransaction").value)==2) document.getElementById("cmbDealer").value = 0;
}
function locationChange() {
    document.getElementById("cmbDealer").value = 0;
}
function underDev() {
    genMessage('Under Development', 'The module your are checking for is in development stage !! Please bear with us. Thank You')
}