window.onload = function(){

    //there will be one span element for each input field
    // when the page is loaded, we create them and append them to corresponding input elements 
	// they are initially empty and hidden

    //email validation
	var email = document.getElementById("email");
    var span1 = document.createElement("span");
    span1.innerHTML = "Please enter correct format: eg. xyz@abc.com";
	span1.style.display = "none"; //hide the span element
    email.parentNode.appendChild(span1);
    var error1 = document.createElement("span");
    error1.innerHTML = "Incorrect Email entered";
    error1.style.display = "none";
    email.parentNode.appendChild(error1);


    email.onfocus = function(){
        document.getElementById("email").className = "form-control";
        span1.style.display = "block";
        error1.style.display = "none";
    }

    email.onblur = function(){
        span1.style.display = "none";
    }


    //password validation
    var password = document.getElementById("pwd");
    var span2 = document.createElement("span");
    span2.innerHTML = `Password should contain atleast:
            <ul><li>six characters </li>
                <li>one uppercase letter</li>
                <li>one lowercase letter</li>
                <li>one special character (!,@,#,$,%,^,&,*,+)</li>
            </ul>`;
    span2.style.display = "none";
    password.parentNode.appendChild(span2);
    var error2 = document.createElement("span");
    error2.innerHTML = "Incorrect password entered";
    error2.style.display = "none";
    password.parentNode.appendChild(error2);

    password.onfocus = function(){
        document.getElementById("pwd").className = "form-control";
        span2.style.display = "block";
        error2.style.display = "none";
    }

    password.onblur = function(){
        span2.style.display = "none";
    }


    //confirm password
    var confirm = document.getElementById("confirm");
    var span3 = document.createElement("span");
    span3.innerHTML = "Enter same password to confirm"
    span3.style.display = "none";
    confirm.parentNode.appendChild(span3);
    var error3 = document.createElement("span");
    error3.innerHTML = "Error, please enter the same password";
    error3.style.display = "none";
    confirm.parentNode.appendChild(error3);

    confirm.onfocus = function(){
        document.getElementById("confirm").className = "form-control";
        span3.style.display = "block";
        error3.style.display = "none";
    }
    confirm.onblur = function(){
        span3.style.display = "none";
    }

    

    
    var form = document.getElementById("myForm");
    form.onsubmit = function(e){
        console.log("entered function");
        var emailCheck = email.value;
        var emailChecked = false;
        if (emailCheck.includes("@") && emailCheck.includes(".")) {
            let array = emailCheck.split("@");
            let prefix = /[a-zA-Z0-9]/;
            let domain1 = /[a-zA-Z]/;
            // let domain2 = /[a-zA-Z]{3}$/; //not working 

            let array2 = array[1].split(".");
            if (array[0].match(prefix) && array2[0].match(domain1) && array2[1].match(domain1)) {
                var emailChecked = true; 
            }  
        }
       
        if (emailChecked == false) {
            error1.style.display = "block";
            document.getElementById("email").className = "error";
            e.preventDefault();
        }

        var pwdCheck = password.value;
        var pwdChecked = false;
        var pwdRegex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+])(?=.{6,}))/;
        if (pwdCheck.match(pwdRegex)) {
            pwdChecked = true;
        }

        if (pwdChecked == false) {
            error2.style.display = "block";
            document.getElementById("pwd").className = "error";
            e.preventDefault();
        }

        confirmPwd = confirm.value;
        if (pwdCheck != confirmPwd) {
            error3.style.display = "block";
            document.getElementById("confirm").className = "error";
            e.preventDefault();
        } 


    }


}


