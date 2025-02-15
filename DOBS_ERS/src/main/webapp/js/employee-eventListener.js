
//---------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------- Get Reimbushment Requests of an employee By Id ----------------------------------------
// Employee menu button
(function (){
    let user = JSON.parse(sessionStorage.getItem("user"))
    const eid = user.id
    if (user.role == "employee"){

         // Get all request. (employee id from Json data in session(in employee-manager-eventListener.js), call another callback func in employee-manager-helper-func.js)
        $("#reimbushmentAllReq").click(()=> getReimbushmentRequestOfOneEmp(eid))

        // Get pending request 
        $("#reimbushmentPendingReq").click(() => {
    
            fetch(globalVariable.backendRoot + "/"+globalVariable.viewReimbushment+"?status=pending&eid="+eid)
            .then(res => res.json())
            .then(data=> {
                if(data != null){
                    displayReimbushment(data, "#displayReimbushment")
            }else
                    alertPopUp("#managerMenu .alert", "No data found")
            })
        })
        // Get resolvedrequest 
        $("#reimbushmentResolvedReq").click(()=>{
            fetch(globalVariable.backendRoot + "/"+globalVariable.viewReimbushment+"?status=resolved&eid="+eid)
            .then(res => res.json())
            .then(data=> {
                if(data != null){
                    console.log(data)
                    displayReimbushment(data, "#displayReimbushment")
            }else
                    alertPopUp("#managerMenu .alert", "No data found")
            })
        })
    } else window.location.replace(globalVariable.backendRoot)
})()

//---------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------- Submit Reimbushment Request ----------------------------------------
// Functions called when Click submit
$("#submitReimbushmentBtn").click(function(e) {
    e.preventDefault()
    let reimbushmentReq = getSubmitReimbushmentInfo()
    sendSubmitReimbushmentRequest(reimbushmentReq)
})

    // send request
function sendSubmitReimbushmentRequest(reimbushmentReq){
    fetch(globalVariable.backendRoot + "/submitReimbushment", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(reimbushmentReq),
    }).then (res => res.json())
    .then (data => {
        if (data.statusCode == 200) {
            alertPopUp("#employeeSubmitReimbushmentSuccess", data.message)
            window.location.replace(globalVariable.backendRoot+"/employee-home.html")
        }
        else alertPopUp("#employeeSubmitReimbushmentError", data.message)
    })
}
// get request body parameter
function getSubmitReimbushmentInfo(){
    const reimbushmentReq = {
        amount: $("#submitReimbushmentForm input[name=amount]").val(),
        typeid: $("#submitReimbushmentForm select[name=type]").val(),
        author: JSON.parse(sessionStorage.getItem("user")).id,
        //receipt: $("#submitReimbushmentForm input[name=receipt]")[0].files[0]
    }
    if(reimbushmentReq.amount > 0) return reimbushmentReq
    else  alertPopUp("#employeeSubmitReimbushmentError", "<p class='text-warning'>Please request a positive amount</p>")
}

// Thumnail for file
$("input[name=receipt]").change(function(){
    if($("#receiptPlaceholder img")) $("#receiptPlaceholder").empty()
    const reader = new FileReader()
    reader.onload = function(){
        const img = new Image()
        img.src = reader.result
        $("#receiptPlaceholder").append(img)
    }
    reader.readAsDataURL(this.files[0])
})


    //---------------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------- Back button to hide container and remove table ----------------------------------------
    $("#employeeHome").click(displayEmployeeHome)

    function displayEmployeeHome(){
        //empty all Viewing Table body
        $("#displayReimbushment tbody").empty()

        // remove display-block for all <main> that is not main menu
        $("main").not("#employeeMenu").removeClass("d-block")
        $("main").not("#employeeMenu").addClass("d-none")
        // remove display-none for main menu
        $("#employeeMenu").removeClass("d-none")
    }
