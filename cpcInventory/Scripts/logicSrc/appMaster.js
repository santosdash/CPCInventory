function fillDropdown_cmbLocation(Control, lcnGroup) {
    var jRes = 0;
    var request;
    var SqlStr = "";
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'select lcn_code as `CODE`, lcn_desc as `DESC` from cpcinventory.location where lc_type in (^STORE^,^GODOWN^) and lcn_active = 1 and lcn_group = @lcn_group order by lcn_desc';
            var url = "/Services/appMaster.asmx/fillDropdown";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', Control: '" + Control + "', groupID: " + lcnGroup + "}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    $("#" + Control).empty();
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    var count = Object.keys(obj).length;
                    try {
                        if (count == 0) {
                            var str = "";
                            $("#" + Control).empty();
                            str += "<option disabled selected value='0'>Error</option>";
                            $("#" + Control).append(str);
                        } else {
                            fillCombo_Data(Control, obj, 'ddown_Code', 'ddown_desc');
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
function fillDropdown_cmbDealer(Control) {
    var jRes = 0;
    var request;
    var SqlStr = "";
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'select lcn_code as `CODE`, lcn_desc as `DESC` from cpcinventory.location where lcn_active = 1 order by lcn_desc';
            var url = "/Services/appMaster.asmx/fillDropdown";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', Control: '" + Control + "', groupID: 0}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    $("#" + Control).empty();
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    var count = Object.keys(obj).length;
                    try {
                        if (count == 0) {
                            var str = "";
                            $("#" + Control).empty();
                            str += "<option disabled selected value='0'>Error</option>";
                            $("#" + Control).append(str);
                        } else {
                            fillCombo_Data(Control, obj, 'ddown_Code', 'ddown_desc');
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
function fillDropdown_cmbGroup(Control) {
    var jRes = 0;
    var request;
    var SqlStr = "";
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'select is_code as `CODE`, is_desc as `DESC`from item_subgroup order by is_code';
            var url = "/Services/appMaster.asmx/fillDropdown";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', Control: 'cmbGroup', groupID: 0}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    $("#" + Control).empty();
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    var count = Object.keys(obj).length;
                    try {
                        if (count == 0) {
                            var str = "";
                            $("#" + Control).empty();
                            str += "<option disabled selected value='0'>Error</option>";
                            $("#" + Control).append(str);
                        } else {
                            fillCombo_Data(Control, obj, 'ddown_Code', 'ddown_desc');
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
function fillDropdown_cmbItem(groupID) {
    var jRes = 0;
    var request;
    var SqlStr = "";
    var Control = "cmbItem";
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'select im_code as `CODE`, im_desc as `DESC` from item_master where im_active = 1 and im_subgroup = @im_subgroup order by im_desc';
            var url = "/Services/appMaster.asmx/fillDropdown";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', Control: 'cmbItem', groupID: " + groupID + "}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    $("#" + Control).empty();
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    var count = Object.keys(obj).length;
                    try {
                        if (count == 0) {
                            var str = "";
                            $("#" + Control).empty();
                            str += "<option disabled selected value='0'>Error</option>";
                            $("#" + Control).append(str);
                        } else {
                            fillCombo_Data(Control, obj, 'ddown_Code', 'ddown_desc');
                        }
                    } catch (e) {
                        jRes = 1;
                        genMessage('Error', e.message)
                    }
                } else {
                    jRes = 1;
                    genMessage('Error', e.message)
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
function fillCombo_Data(Did, data, valkey, textkey) {
    var str = "";
    var myFirstRec = 0;
    $("#" + Did).empty();
    if (Did === 'cmbLocation_Select') {
        str += "<option selected value='0'>NEW</option>";
    } else {
        str += "<option disabled selected value='0'>SELECT</option>";
    }
    
    for (var i = 0; i < data.length; i++) {
        str += "<option value='" + data[i][valkey] + "'>" + data[i][textkey] + "</option>";
    }
    $("#" + Did).append(str);    
};
function fillDropdown_cmbLoc(Control) {
    var jRes = 0;
    var request;
    var SqlStr = "";
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'select lcn_code as `CODE`, lcn_desc as `DESC` from cpcinventory.location order by lcn_desc';
            var url = "/Services/appMaster.asmx/fillDropdown";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', Control: 'cmbLocation_Select', groupID: 0}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    $("#" + Control).empty();
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    var count = Object.keys(obj).length;
                    try {
                        if (count == 0) {
                            var str = "";
                            $("#" + Control).empty();
                            str += "<option disabled selected value='0'>Error</option>";
                            $("#" + Control).append(str);
                        } else {
                            fillCombo_Data(Control, obj, 'ddown_Code', 'ddown_desc');
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
function getLocation(locationID) {
    var jRes = 0;
    var request;
    var SqlStr = "";
    if (locationID <= 0) return

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'SELECT * FROM location where lcn_code =  @lcn_code';

            var url = "/Services/appMaster.asmx/getLocation";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "', locationID: " + locationID + "}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var json = this.responseText;
                    var obj = JSON.parse(json).d;
                    try {
                        document.getElementById("txtAddress").value = obj[0]['icn_address'];
                        var groupCmb = document.getElementById('cmbLCType');
                        var len = groupCmb.options.length;
                        for (i = 0; i < len; i++) {
                            if (groupCmb.options[i].innerHTML == obj[0]['ic_type'].toUpperCase()) {
                                groupCmb.selectedIndex = i;
                                break;
                            }
                        }

                        document.getElementById("txtGroup_ID").value = obj[0]['icn_group'];
                        if (Number(obj[0]['icn_active']) > 0) document.getElementById("chkLocation").checked = true;
                        if (Number(obj[0]['icn_active']) <= 0) document.getElementById("chkLocation").checked = false;
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
function getmaxGroup_ID() {
    var jRes = 0;
    var request;
    var SqlStr = "";

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            SqlStr = 'SELECT max(coalesce((lcn_group),0)+1) maxGroupID FROM location';

            var url = "/Services/appMaster.asmx/getmax_GID";
            request.open("POST", url, false);
            var params = "{ SqlStr: '" + SqlStr + "'}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var json = this.responseText;
                    try {
                        document.getElementById("txtGroup_ID").value = JSON.parse(json).d;
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
function locationMaintenance(iopt) {
    var locationValue = document.getElementById("cmbLocation_Select").value
    var locationText = document.getElementById("cmbLocation_Select").options[document.getElementById("cmbLocation_Select").selectedIndex].text
    if (iopt.trim().length > 0) locationText = iopt;
    if (locationText === 'NEW') {
        document.getElementById("cmbLocation_Select").value = 0;
        document.getElementById("txtAddress").value = "";
        var groupCmb = document.getElementById('cmbLCType');
        var len = groupCmb.options.length;
        for (i = 0; i < len; i++) {
            if (groupCmb.options[i].innerHTML == "SELECT") {
                groupCmb.selectedIndex = i;
                break;
            }
        }
        document.getElementById("chkLocation").checked = true;
        getmaxGroup_ID()
    } else {
        getLocation(locationValue)
    }
};
function saveLocation() {
    var jRes = 0;
    var request;

    var locationID = document.getElementById("cmbLocation_Select").value;
    var shortDesc = document.getElementById("txtSh_Desc").value;
    var locAddress = document.getElementById("txtAddress").value;
    var locType = document.getElementById("cmbLCType").options[document.getElementById("cmbLCType").selectedIndex].text;
    var locGroup = document.getElementById("txtGroup_ID").value;

    var locact_value = 0;
    if (document.getElementById("chkLocation").checked) {
        locact_value = 1;
    } else {
        locact_value = 0;
    }

    var locActive = locact_value;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    try {
        if (request != null) {
            var url = "/Services/appMaster.asmx/saveLocation";
            request.open("POST", url, false);
            var params = "{ locationID: " + locationID + ", shortDesc: '" + shortDesc + "', locAddress: '" + locAddress + "', locType: '" + locType + "', locGroup: " + locGroup + ", locActive: " + locActive + "}";
            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("dataType", "json");
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    var json = this.responseText;
                    genMessage('Save', JSON.parse(json).d);
                    locationMaintenance('NEW');
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