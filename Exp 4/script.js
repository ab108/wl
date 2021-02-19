var nameflag=0;
var emailflag=0;
var dateflag=0;

function name_val(){
    var name = document.getElementById('name').value;
    var num=0, space=0;
    var nameerror = document.getElementById("nameerror");
    nameerror.innerHTML = "";

    if(name == ""){
        nameflag=1;
        nameerror.innerHTML = "Please fill out this field!";
    }   
    else { 
        for(let i=0;i<name.length;i++){
            if(name.charCodeAt(i) >= 48 && name.charCodeAt(i) <= 57){
                num = 1;
            }
            if(name.charCodeAt(i) == 32)
                space++;
        }
        if(num == 0 && space<=2)
            nameflag=0;
        else  {
            nameerror.innerHTML = "Only characters allowed!";
            nameflag=1;
        } 
    }
    
    
}


function IsValidEmail(email) {
    if (email.length <= 2) {
        return false;
    }
    if (email.indexOf("@") == -1) {
        return false;
    }

    var parts = email.split("@");
    console.log(parts);
    var dot = parts[1].indexOf(".");
    var len = parts[1].length;
    var dotSplits = parts[1].split(".");
    var dotCount = dotSplits.length - 1;

    if (dot == -1 || dot < 2 || dotCount > 2) {
       return false;
    }

    for (var i = 0; i < dotSplits.length; i++) {
        if (dotSplits[i].length == 0) {
            return false;
        }
    }

    return true
}

function email_val() {
    var email = document.getElementById("email").value;
    var emailerror = document.getElementById("emailerror");
    emailerror.innerHTML = "";
    
    if(email == ""){   
        emailerror.innerHTML = "Please fill out this field!";
        emailflag=1;
    }
    else{
            if (!IsValidEmail(email)) {
            emailerror.innerHTML = "Invalid email address!";
            emailflag=1;
        }
        else{
            emailflag=0;
        }
    }
}


function date_val(){

    var date = document.getElementById("date").value;

    var dateerror = document.getElementById("dateerror");
    dateerror.innerHTML = "";

    
    if(date == ""){
        dateerror.innerHTML = "Please fill out this field!";
        dateflag=1;
    }
    else{
        var age = document.getElementById("age");
        var splitdate = date.split('/');
        var dd=splitdate[0];
        var mm=splitdate[1];
        var yyyy=splitdate[2];
        var err=0;
        if (err = ((yyyy > 1900) && (yyyy<=2020))) {
            if (err = (mm <= 12 && mm > 0)) {

                var Leap = (((yyyy % 4) == 0) && ((yyyy % 100) != 0) || ((yyyy % 400) == 0));   
                
                if(err = dd > 0)
                {
                    if (mm == 2) {  
                        err = Leap ? dd <= 29 : dd <= 28;
                    } 
                    else {
                        if ((mm == 4) || (mm == 6) || (mm == 9) || (mm == 11)) {
                            err = dd <= 30;
                        }
                        else {
                            err = dd <= 31;
                        }
                    }
                }
            }
        }
        else
                err=1;

        if(err == 1){
            dateflag=0;  
            if(yyyy != undefined && date.length==10){
                
                age.innerHTML = 2020 - yyyy;
            }
        }  
        else {
            dateflag=1; 
            dateerror.innerHTML = "Invalid date!"
            age.innerHTML = " ";         
        }
        console.log(dateflag);
    }
    console.log(dateflag);
    
}

function submit(){
    name_val();
    email_val();
    date_val();
    var result = document.getElementById('result');
    console.log(nameflag, emailflag, dateflag);
    if((nameflag || emailflag || dateflag)==0)
        result.innerHTML = "Form submitted succesfully!";
    else    
        result.innerHTML = "";
}
