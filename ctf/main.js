(function() {
    "use strict";
    // Shortcut to get elements
    var el = function(element) {
        if (element.charAt(0) === "#") { // If passed an ID...
            return document.querySelector(element); // ... returns single element
        }
        return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };
    // Variables
    var viewer = el("#viewer"),
        calc = el("#calc"), // Calculator screen where result is displayed
        equals = el("#equals"), // Equal button
        nums = el(".num"), // List of numbers
        ops = el(".ops"), // List of operators
        theNum = "", // Current number
        oldNum = "", // First number
        resultNum, // Result
        operator, // Op
        url = new URL(document.location),
        a = url.searchParams.get("num1"),
        b = url.searchParams.get("num2"),
        op = url.searchParams.get("op")
    // When: Number is clicked. Get the current number selected
    var setNum = function() {
        if (resultNum) { // If a result was displayed, reset number
            theNum = this.getAttribute("data-num");
            resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
            theNum += this.getAttribute("data-num");
        }
        viewer.innerHTML = theNum; // Display current number
        calc.innerHTML = calc.innerHTML + this.getAttribute("data-num");
        url.searchParams.set("num2", theNum);
        var newRelativePathQuery = window.location.pathname + '?' + url.searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
    };
    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {
        operator = this.getAttribute("data-ops");
        oldNum = theNum;
        url.searchParams.set("num1", oldNum);
        url.searchParams.delete("num2")
        url.searchParams.set("operator", operator);
        var newRelativePathQuery = window.location.pathname + "?" + url.searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
        theNum = "";
        calc.innerHTML = oldNum + operator;
        equals.setAttribute("data-result", ""); // Reset result in attr
    };
    // When: Equals is clicked. Calculate result
    var displayNum = function() {
        // Convert string input to numbers
        var num1 = parseFloat(url.searchParams.get("num1"));
        var num2 = parseFloat(url.searchParams.get("num2"));
        var op = url.searchParams.get("operator")
        calc.innerHTML = url.searchParams.get("num1") + url.searchParams.get("operator") + url.searchParams.get("num2");
        // Perform operation
        switch (op) {
            case "+":
                resultNum = num1 + num2;
                break;
            case "-":
                resultNum = num1 - num2;
                break;
            case "*":
                resultNum = num1 * num2;
                break;
            case "/":
                resultNum = num1 / num2;
                break;
                // If equal is pressed without an operator, keep number and continue
            default:
                resultNum = num2;
        }
        // // If NaN or Infinity returned
        // if (!isFinite(resultNum)) {
        //     resultNum = "You broke it!";
        //     el('#calculator').classList.add("broken"); // Break calculator
        //     el('#submit').classList.add("show"); // And show reset button
        // }
        // Display result, finally!
        viewer.innerHTML = resultNum;
        equals.setAttribute("data-result", resultNum);
        el('#submit').classList.add("show");
        // Now reset oldNum & keep result
        oldNum = 0;
        theNum = resultNum;
    };
    // When: Clear button is pressed. Clear everything
    var clearAll = function() {
        oldNum = "";
        theNum = "";
        operator = "";
        viewer.innerHTML = "0";
        calc.innerHTML = "";
        equals.setAttribute("data-result", resultNum);
        url.searchParams.delete('num1');
        url.searchParams.delete('num2');
        url.searchParams.delete('operator')
        history.pushState(null, '', window.location.pathname);
    };
    /* The click events */
    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }
    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }
    // Add click event to equal sign
    equals.onclick = displayNum;
    // Add click event to clear button
    el("#clear").onclick = clearAll;
    // Add click event to reset button
    // Add click event to reset button
    el("#submit").onclick = function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                window.location = his.getResponseHeader("Location");
            }
        };
        xhttp.open("POST", "/save", true);
        xhttp.send(url.search);
    };
    window.onload = function() {
        if (url.searchParams.get('num1') && url.searchParams.get('num2') && url.searchParams.get('operator')) {
            displayNum()
        }
    };
}());
