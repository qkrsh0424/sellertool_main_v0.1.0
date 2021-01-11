init();

function init() {
    console.log("2")
    loadCalculatorHtml().calculatorHtml()
    handlerCalculator().calculatorOnMouseClick()
    // loadCalculatorHtml().calculatorDragOpen()
    //버튼 drag and move 움직일때 클릭안되게
    $('#i_open_btn').draggable({
        containment: 'document',
        cancel: false,
        stop: function (event, ui) {
            // event.toElement is the element that was responsible
            // for triggering this event. The handle, in case of a draggable.
            $(event.originalEvent.target).one('click', function (e) { e.stopImmediatePropagation(); });
        }
    })
}


function loadCalculatorHtml() {
    return {
        calculatorDragOpen: function () {

            $('#i_ty_st_calculator').draggable({ containment: 'document' })
            $('#i_ty_st_calculator').addClass('st-calc-show')
            $('#i_open_btn').removeClass('st-calc-show')

        },
        calculatorHtml: function () {
            let calHtml = ``;
            calHtml += `
                    <div id="i_ty_st_calculator" class="ty-st-cal-calculator" role="application" tabindex="0" onkeydown="handlerCalculator().calculatorOnKeyDown(event)">
                        <!-- Screen -->
                        <div class="ty-st-cal-top" onmousedown="handlerCalculator().draggableOpen()">
                            <div class="ty-st-cal-nav">
                                <div class="ty-st-cal-minimi" onclick="handlerCalculator().closeCalculatorHtml()"></div>
                            </div>
                            <div id="i_ty_st_screen" class="ty-st-cal-screen" aria-labelledby="displayScreen" onclick="handlerCalculator().calculatorOnFocusScreen()"  ></div>
                        </div>

                        <div class="ty-st-cal-keys" aria-labelledby="inputKeys" >
                            <!-- operators and other keys -->
                            <span tabindex="0" class="ty-st-cal-operator ty-st-cal-top-operator">C</span>
                            <span tabindex="0" class="ty-st-cal-operator ty-st-cal-top-operator"><i class="far fa-clipboard"></i></span>
                            <span tabindex="0" class="ty-st-cal-operator ty-st-cal-top-operator">%</span>
                            <span tabindex="0" class="ty-st-cal-operator">÷</span>
                            <span tabindex="0">7</span>
                            <span tabindex="0">8</span>
                            <span tabindex="0">9</span>
                            <span tabindex="0" class="ty-st-cal-operator">x</span>

                            <span tabindex="0">4</span>
                            <span tabindex="0">5</span>
                            <span tabindex="0">6</span>
                            <span tabindex="0" class="ty-st-cal-operator">-</span>
                            <span tabindex="0">1</span>
                            <span tabindex="0">2</span>
                            <span tabindex="0">3</span>
                            <span tabindex="0" class="ty-st-cal-operator">+</span>

                            <span tabindex="0">0</span>
                            <span tabindex="0">00</span>
                            <span tabindex="0">.</span>

                            <span tabindex="0" class="ty-st-cal-eval">=</span>

                        </div>
                    </div>
                `;
            $('#i_ty_st_cal_container').html(calHtml)
        }
    }
}



function handlerCalculator() {

    return {
        calculatorOnMouseClick: function () {
            // Select all the from document using queryselectAll
            var keys = document.querySelectorAll('#i_ty_st_calculator span');
            // Define operators
            var operators = ['+', '-', 'x', '÷', '<i class="far fa-clipboard"></i>', '%'];
            // Set decimal flag for use later
            var decimalAdded = false;

            // loop through all keys
            for (var i = 0; i < keys.length; i++) {
                //add onclick event to the keys
                keys[i].onclick = function (e) {
                    $('.ty-st-cal-screen').css('fontSize', '30px')
                    // Get the input and button values
                    var input = document.querySelector('.ty-st-cal-screen');
                    var inputVal = input.innerHTML;
                    var btnVal = this.innerHTML;

                    // if (input.innerText.length > 9) {
                    //     input.innerText = input.innerText.substr(0, input.innerText.length - 1)
                    // }
                    if (input.innerText.length < 11) {
                        $('.ty-st-cal-screen').css('fontSize', '30px')
                    } else if (input.innerText.length < 14) {
                        $('.ty-st-cal-screen').css('fontSize', '22px')
                    } else if (input.innerText.length < 18) {
                        $('.ty-st-cal-screen').css('fontSize', '18px')
                    } else {
                        $('.ty-st-cal-screen').css('fontSize', '18px')
                        input.innerText = input.innerText.slice(0, 17)
                    }

                    if (input.innerText.indexOf('최대') !== -1 || input.innerText == Infinity || input.innerText.indexOf('복사') !== -1) (
                        input.innerText = ''
                    )

                    // If clear key is pressed, erase everything
                    if (btnVal == 'C') {
                        input.innerHTML = '';
                        decimalAdded = false;
                    }
                    // when click clipboard copy to board
                    else if (btnVal == '<i class="far fa-clipboard"></i>') {
                        var range = document.createRange();
                        range.selectNode(document.getElementById("i_ty_st_screen"));
                        window.getSelection().removeAllRanges(); // clear current selection
                        window.getSelection().addRange(range); // to select text
                        document.execCommand("copy");
                        window.getSelection().removeAllRanges(); // to deselect
                        $('.ty-st-cal-screen').css('fontSize', '22px')
                        input.innerHTML = '복사되었습니다!';
                    }

                    // If eval key is pressed, calculate and display the result
                    else if (btnVal == '=') {
                        var equation = inputVal; //append equation to variable
                        var lastChar = equation[equation.length - 1]; //target the end of the eval string

                        // Use regex to replace all instances of x, ÷, ^ with *, / and **
                        equation = equation.replace(/x/g, '*').replace(/÷/g, '/').replace(/\^/g, '\*\*').replace(/%/g, '/1000');

                        //Use regex to remove decimals from the end of an equation
                        if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                            equation = equation.replace(/.$/, '');

                        // use javascript's eval function to get the result

                        if (equation) {
                            if (eval(equation).toFixed(6).toString().length < 31) {
                                input.innerHTML = parseFloat((eval(equation)).toFixed(6));
                                decimalAdded = false;
                            } else {
                                input.innerHTML = "최대 18자리까지 표시됩니다."
                                $('.ty-st-cal-screen').css('fontSize', '16px')
                            }
                        }


                    }
                    // Javascript checks
                    // No two operators should be added consecutively.		
                    else if (operators.indexOf(btnVal) > -1) {
                        // Get the last character from the equation
                        var lastChar = inputVal[inputVal.length - 1];

                        // Only add operator if input is not empty 
                        if (inputVal != '' && operators.indexOf(lastChar) == -1)
                            input.innerHTML += btnVal;

                        // Allow minus operator if the string is empty
                        else if (inputVal == '' && btnVal == '-')
                            input.innerHTML += btnVal;

                        // Replace the last operator (if exists) with the newly pressed operator
                        if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                            input.innerHTML = inputVal.replace(/.$/, btnVal);
                        }

                        decimalAdded = false;
                    }
                    // allow decimal point input
                    else if (btnVal == '.') {
                        if (!decimalAdded) {
                            input.innerHTML += btnVal;
                            decimalAdded = true;
                        }
                    }

                    // if any other key is pressed, just append it after the decimal
                    else {
                        input.innerHTML += btnVal;
                    }

                    // prevent page jumps
                    e.preventDefault();
                }
            }

        },
        calculatorOnFocusScreen: function () {
            // $('#i_ty_st_calculator').draggable()
            $('#i_ty_st_calculator').draggable('disable')
            $('#i_ty_st_calculator').focus()
        },
        calculatorOnKeyDown: function (event) {

            // Define operators
            var operators = ['+', '-', 'x', '÷', '^', '%'];

            var key_press = String.fromCharCode(event.keyCode);
            var key_code = event.keyCode;
            var input = document.querySelector('.ty-st-cal-screen');
            var inputVal = input.innerHTML;
            var btnVal = this.innerHTML;
            var lastChar = inputVal[inputVal.length - 1];
            var equation = inputVal;
            // Using regex to replace all instances of x, ÷, ^ with *, / and ** respectively. 
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/').replace(/\^/g, '**').replace(/%/g, '/100');

            $('.ty-st-cal-screen').css('fontSize', '30px')

            if (equation.indexOf('최대') !== -1 || input.innerText == Infinity || equation.indexOf('복사') !== -1) (
                input.innerText = ''
            )

            // if (input.innerText.length > 9) {
            //     input.innerText = input.innerText.substr(0, input.innerText.length - 1)
            // }
            if (input.innerText.length < 11) {
                $('.ty-st-cal-screen').css('fontSize', '30px')
            } else if (input.innerText.length < 14) {
                $('.ty-st-cal-screen').css('fontSize', '22px')
            } else if (input.innerText.length < 18) {
                $('.ty-st-cal-screen').css('fontSize', '18px')
            } else {
                $('.ty-st-cal-screen').css('fontSize', '18px')
                input.innerText = input.innerText.slice(0, 17)
            }

            // Target each keypress and update the input screen
            if (key_press == 1) {
                input.innerHTML += key_press;
            } else if (key_press == 2) {
                input.innerHTML += key_press;
            } else if (key_press == 3 || key_code == 32) {
                input.innerHTML += key_press;
            } else if (key_press == 4) {
                input.innerHTML += key_press;
            } else if (key_press == 5 && event.shiftKey == false) {
                input.innerHTML += key_press;
            } else if (key_press == 6 && event.shiftKey == false) {
                input.innerHTML += key_press;
            } else if (key_press == 7) {
                input.innerHTML += key_press;
            } else if (key_press == 8 && event.shiftKey == false) {
                input.innerHTML += key_press;
            } else if (key_press == 9) {
                input.innerHTML += key_press;
            } else if (key_press == 0 && event.shiftKey == false) {
                input.innerHTML += key_press;
            } else if (key_press == 0 && event.shiftKey) {
                input.innerHTML += key_press + key_press;
            } else if (key_code == 77 && event.shiftKey) {
                if ($('#i_ty_st_calculator').hasClass('st-calc-show')) {
                    $('#i_ty_st_calculator').removeClass('st-calc-show')
                    $('#i_open_btn').addClass('st-calc-show')
                } else {
                    $('#i_ty_st_calculator').addClass('st-calc-show')
                    $('#i_open_btn').removeClass('st-calc-show')
                }
            }

            // Cature operators and prevent from addint two consecutuve operators
            else if ((inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 187 && event.shiftKey) || (key_code == 107) || (key_code == 61 && event.shiftKey)) {
                input.innerHTML += '+';
            } else if ((key_code == 189 && event.shiftKey) || (key_code == 107) || (key_code == 189)) {
                input.innerHTML += '-';
            } else if ((inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 56 && event.shiftKey) || (inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 106)) {
                input.innerHTML += 'x';
            } else if ((inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 191) || (inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 111)) {
                input.innerHTML += '÷';
            } else if ((inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 54)) {
                input.innerHTML += '^';
            } else if ((inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 53 && event.shiftKey)) {
                input.innerHTML += '%';
            }
            // shift + c copy to clipboard
            else if ((inputVal != '' && operators.indexOf(lastChar) == -1 && key_code == 67 && event.shiftKey)) {
                var range = document.createRange();
                range.selectNode(document.getElementById("i_ty_st_screen"));
                window.getSelection().removeAllRanges(); // clear current selection
                window.getSelection().addRange(range); // to select text
                document.execCommand("copy");
                window.getSelection().removeAllRanges(); // to deselect
                $('.ty-st-cal-screen').css('fontSize', '22px')
                input.innerHTML = '복사되었습니다!';
            }
            if (key_code == 13 || key_code == 187 && event.shiftKey == false) {
                console.log(eval(equation).toString().length - 1)
                console.log(eval(equation))
                if (equation) {
                    if (eval(equation).toFixed(9).toString().length < 31) {
                        input.innerHTML = parseFloat((eval(equation)).toFixed(9));
                        decimalAdded = false;
                    } else {
                        input.innerHTML = "최대 18자리까지 표시됩니다."
                        $('.ty-st-cal-screen').css('fontSize', '16px')
                    }
                }
            } else if (key_code == 8 || key_code == 46) {
                input.innerText = input.innerText.substr(0, input.innerText.length - 1)
                decimalAdded = false;
            } else if (key_code == 27) {
                input.innerHTML = '';
                decimalAdded = false;
            }

        },
        draggableOpen: function () {
            // $('#i_ty_st_calculator').draggable()
            $('#i_ty_st_calculator').draggable('enable')
        },
        closeCalculatorHtml: function () {
            $('#i_ty_st_calculator').removeClass('st-calc-show')
            $('#i_open_btn').addClass('st-calc-show')
        },


    }
}