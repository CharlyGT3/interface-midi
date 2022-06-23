import {options} from ".//addOptions.js";

var switches = document.querySelector(".switches");
var Add = document.querySelector(".Add");
var Remove = document.querySelector(".Remove");

function addLocalStorage () {
    let saveNumSwitches = switches.childNodes.length;
        let saveSwitches = switches.childNodes[saveNumSwitches - 1].outerHTML;
        localStorage.setItem("switches" + (saveNumSwitches - 1), saveSwitches);
}

function removeLocalStorage () {
    let saveNumSwitches = switches.childNodes.length;
        localStorage.removeItem("switches" + saveNumSwitches);
        }

function insertLocalStorage () {
    let localStorageLength = localStorage.length;
    for (var i = 0; i < localStorageLength; i++) {
        let lSSW = localStorage.getItem("switches" + (i + 1));
        switches.insertAdjacentHTML("beforeend", lSSW);
    }
}

insertLocalStorage();

Add.addEventListener("click", function() {
    switches.insertAdjacentHTML("beforeend", options);
    addLocalStorage();
}
);
Remove.addEventListener("click", function() {
    let saveNumSwitches = switches.childNodes.length;
    if (saveNumSwitches > 0) {
    switches.removeChild(switches.lastChild);
    removeLocalStorage();
    }
}
);

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({sysex: true}).then(onMIDISuccess, onMIDIFailure);
} else {
        alert("No MIDI support in your browser.");
    }

    function onMIDISuccess(midiAccess) {
        for (var input of midiAccess.inputs.values()) {
            input.onmidimessage = getMIDIMessage;
        }
    }

    function onMIDIFailure(msg) {
        alert("Failed to get MIDI access - " + msg);
    }


    function getMIDIMessage(message) {
        var command = message.data[0];
        var note = message.data[1];
        var velocity = message.data[2];
                document.querySelector(".commandInfo").textContent = command;
                document.querySelector(".NoteInfo").textContent = note;
                document.querySelector(".velocityInfo").textContent = velocity;

        if (command == 177) {
            var footSwitchContent = document.querySelectorAll(".footSwitchContent");
            if (velocity > 0) {
                for (var i = 0; i < footSwitchContent.length; i++) {
                    console.log(footSwitchContent[i].children[3].selectedOptions[0].value);
                    if (footSwitchContent[i].children[3].selectedOptions[0].value == note) {
                        footSwitchContent[i].children[1].classList.add("active");
                    }
                }
            } else {
                for (var i = 0; i < footSwitchContent.length; i++) {
                    if (footSwitchContent[i].children[3].selectedOptions[0].value == note) {
                        footSwitchContent[i].children[1].classList.remove("active");
                    }
                }
            }
        }
    }