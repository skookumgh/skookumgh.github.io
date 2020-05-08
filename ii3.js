    	var dataURL = 'ws://127.0.0.1:8181/';

    var ws = null;
    var wiiArray = new Array (20);
    var balBoardArray = new Array (3);
	
	var wsOnmessage = function (evt) {
	   var wiimoteData = JSON.parse(evt.data);
	   if ( wiimoteData.deviceType == "Wiimote")
	   {
			wiiArray[wiimoteData.devNum] = wiimoteData;
	   }
	   if ( wiimoteData.deviceType == "BalanceBoard")
	   {
			balBoardArray[wiimoteData.devNum] = wiimoteData;
	   }
	};
	

class iiConnect2Scratch {
    //Converted from https://creativecomputerlab.github.io/iiConnect2Scratch.js to Scratch 3.0 using Ext2to3!

    getInfo() {
        return {
            "id": "iiConnect2Scratch",
            "name": "iiConnect2Scratch",
            "blocks": [{
                "opcode": "wmoteButtonPress1",
                "blockType": "reporter",
                "text": "button [button] on [wiimote]",
                "arguments": {
                    "button": {
                        "type": "string",
                        "menu": "button",
                        "defaultValue": "A"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "setLED",
                "blockType": "command",
                "text": "turn [state] light [light] on [wiimote]",
                "arguments": {
                    "state": {
                        "type": "string",
                        "menu": "state",
                        "defaultValue": "off"
                    },
                    "light": {
                        "type": "string",
                        "menu": "light",
                        "defaultValue": "1"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "setRumble",
                "blockType": "command",
                "text": "turn rumble [state] on [wiimote]",
                "arguments": {
                    "state": {
                        "type": "string",
                        "menu": "state",
                        "defaultValue": "off"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "getAccel",
                "blockType": "reporter",
                "text": "accel [coordXYZ] on [wiimote]",
                "arguments": {
                    "coordXYZ": {
                        "type": "string",
                        "menu": "coordXYZ",
                        "defaultValue": "x"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "wmoteButtonPress",
                "blockType": "hat",
                "text": "When button [button] pressed on [wiimote]",
                "arguments": {
                    "button": {
                        "type": "string",
                        "menu": "button",
                        "defaultValue": "A"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "wiimoteBatteryState",
                "blockType": "reporter",
                "text": "[wiimote] battery",
                "arguments": {
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "nunchuckButtonPress1",
                "blockType": "reporter",
                "text": "nunchuck button [button] pressed on [wiimote]",
                "arguments": {
                    "button": {
                        "type": "string",
                        "menu": "nButton",
                        "defaultValue": "C"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "nGetAccel",
                "blockType": "reporter",
                "text": "nunchuck accel [coordXYZ] on [wiimote]",
                "arguments": {
                    "coordXYZ": {
                        "type": "string",
                        "menu": "coordXYZ",
                        "defaultValue": "x"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "getJoy",
                "blockType": "reporter",
                "text": "nunchuck joystick  [coordXY] on [wiimote]",
                "arguments": {
                    "coordXY": {
                        "type": "string",
                        "menu": "coordXY",
                        "defaultValue": "x"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "nunchuckButtonPress",
                "blockType": "hat",
                "text": "When nunchuck button [button] pressed on [wiimote]",
                "arguments": {
                    "button": {
                        "type": "string",
                        "menu": "nButton",
                        "defaultValue": "C"
                    },
                    "wiimote": {
                        "type": "string",
                        "menu": "wiimote",
                        "defaultValue": "wiimote 1"
                    }
                }
            }, {
                "opcode": "getTopLeft",
                "blockType": "reporter",
                "text": "topLeft [board]",
                "arguments": {
                    "board": {
                        "type": "string",
                        "menu": "board",
                        "defaultValue": "balanceBoard 1"
                    }
                }
            }, {
                "opcode": "getTopRight",
                "blockType": "reporter",
                "text": "topRight [board]",
                "arguments": {
                    "board": {
                        "type": "string",
                        "menu": "board",
                        "defaultValue": "balanceBoard 1"
                    }
                }
            }, {
                "opcode": "getBottomLeft",
                "blockType": "reporter",
                "text": "bottomLeft [board]",
                "arguments": {
                    "board": {
                        "type": "string",
                        "menu": "board",
                        "defaultValue": "balanceBoard 1"
                    }
                }
            }, {
                "opcode": "getBottomRight",
                "blockType": "reporter",
                "text": "bottomRight [board]",
                "arguments": {
                    "board": {
                        "type": "string",
                        "menu": "board",
                        "defaultValue": "balanceBoard 1"
                    }
                }
            }, {
                "opcode": "setBbLED",
                "blockType": "command",
                "text": "turn [board] light [state]",
                "arguments": {
                    "board": {
                        "type": "string",
                        "menu": "board",
                        "defaultValue": "balanceBoard 1"
                    },
                    "state": {
                        "type": "string",
                        "menu": "state",
                        "defaultValue": "off"
                    }
                }
            }, {
                "opcode": "bBoardBatteryState",
                "blockType": "reporter",
                "text": "[board] battery",
                "arguments": {
                    "board": {
                        "type": "string",
                        "menu": "board",
                        "defaultValue": "balanceBoard 1"
                    }
                }
            }, {
                "opcode": "Connect",
                "blockType": "command",
                "text": "connect to wii",
                "arguments": {}
            }, {
                "opcode": "Disconnect",
                "blockType": "command",
                "text": "disconnect from wii",
                "arguments": {}
            }],
            "menus": {
                wiimote: this._formatMenu(['wiimote 1', 'wiimote 2']),
                button: this._formatMenu(['A', 'B', '-', 'home', '+', '1', '2', 'up', 'down', 'left', 'right']),
                light: this._formatMenu(['1', '2', '3', '4']),
                coordXYZ: this._formatMenu(['x', 'y', 'z']),
                state: this._formatMenu(['on', 'off']),
                coordXY: this._formatMenu(['x', 'y']),
                nButton: this._formatMenu(['C', 'Z']),
                board: this._formatMenu(['balanceBoard 1', 'balanceBoard 2']),
            }
        };
    }
    wmoteButtonPress1({
        button,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        switch (button) {
            case 'A':
                return wiiArray[wiiNum].btnA;
            case 'B':
                return wiiArray[wiiNum].btnB;
            case '-':
                return wiiArray[wiiNum].btnMinus;
            case 'home':
                return wiiArray[wiiNum].btnHome;
            case '+':
                return wiiArray[wiiNum].btnPlus;
            case '1':
                return wiiArray[wiiNum].btnOne;
            case '2':
                return wiiArray[wiiNum].btnTwo;
            case 'up':
                return wiiArray[wiiNum].btnUp;
            case 'down':
                return wiiArray[wiiNum].btnDown;
            case 'left':
                return wiiArray[wiiNum].btnLeft;
            case 'right':
                return wiiArray[wiiNum].btnRight;
        }
    }
    setLED({
        state,
        light,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        var thisState;
        if (state == 'on')
            thisState = "true";
        else
            thisState = "false";

        var request = {
            request: "setLED",
            deviceType: "Wiimote",
            devNum: wiiNum,
            state: thisState,
            LED: light
        };
        ws.send(JSON.stringify(request));
    }
    setRumble({
        state,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        var thisState;
        if (state == 'on')
            thisState = "true";
        else
            thisState = "false";

        var request = {
            request: "setRumble",
            deviceType: "Wiimote",
            devNum: wiiNum,
            state: thisState,
            LED: 0
        };
        ws.send(JSON.stringify(request));
    }
    getAccel({
        coordXYZ,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        switch (coordXYZ) {
            case 'x':
                return wiiArray[wiiNum].accelX.toFixed(4);
            case 'y':
                return wiiArray[wiiNum].accelY.toFixed(4);
            case 'z':
                return wiiArray[wiiNum].accelZ.toFixed(4);
        }
    }
    wmoteButtonPress({
        button,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        switch (button) {
            case 'A':
                return wiiArray[wiiNum].btnA;
            case 'B':
                return wiiArray[wiiNum].btnB;
            case '-':
                return wiiArray[wiiNum].btnMinus;
            case 'home':
                return wiiArray[wiiNum].btnHome;
            case '+':
                return wiiArray[wiiNum].btnPlus;
            case '1':
                return wiiArray[wiiNum].btnOne;
            case '2':
                return wiiArray[wiiNum].btnTwo;
            case 'up':
                return wiiArray[wiiNum].btnUp;
            case 'down':
                return wiiArray[wiiNum].btnDown;
            case 'left':
                return wiiArray[wiiNum].btnLeft;
            case 'right':
                return wiiArray[wiiNum].btnRight;
        }
    }
    wiimoteBatteryState({
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        return wiiArray[wiiNum].battery;
    }
    nunchuckButtonPress1({
        button,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        switch (button) {
            case 'C':
                return wiiArray[wiiNum].nunchuck.btnC;
            case 'Z':
                return wiiArray[wiiNum].nunchuck.btnZ;
        }
    }
    nGetAccel({
        coordXYZ,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        switch (coordXYZ) {
            case 'x':
                return wiiArray[wiiNum].nunchuck.accelX.toFixed(4);
            case 'y':
                return wiiArray[wiiNum].nunchuck.accelY.toFixed(4);
            case 'z':
                return wiiArray[wiiNum].nunchuck.accelZ.toFixed(4);
        }
    }
    getJoy({
        coordXY,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        switch (coordXY) {
            case 'x':
                return wiiArray[wiiNum].nunchuck.joyX.toFixed(4);
            case 'y':
                return wiiArray[wiiNum].nunchuck.joyY.toFixed(4);
        }
    }
    nunchuckButtonPress({
        button,
        wiimote
    }) {
        var wiiNum = wiimote.replace(/[^0-9]/g, '');
        switch (button) {
            case 'C':
                return wiiArray[wiiNum].nunchuck.btnC;
            case 'Z':
                return wiiArray[wiiNum].nunchuck.btnZ;
        }
    }
    getTopLeft({
        board
    }) {
        var boardNum = board.replace(/[^0-9]/g, '');
        return balBoardArray[boardNum].topLeft.toFixed(4);
    }
    getTopRight({
        board
    }) {
        var boardNum = board.replace(/[^0-9]/g, '');
        return balBoardArray[boardNum].topRight.toFixed(4);
    }
    getBottomLeft({
        board
    }) {
        var boardNum = board.replace(/[^0-9]/g, '');
        return balBoardArray[boardNum].btmLeft.toFixed(4);
    }
    getBottomRight({
        board
    }) {
        var boardNum = board.replace(/[^0-9]/g, '');
        return balBoardArray[boardNum].btmRight.toFixed(4);
    }
    setBbLED({
        board,
        state
    }) {
        var deviceNum = board.replace(/[^0-9]/g, '');
        var thisState;
        if (state == 'on')
            thisState = "true";
        else
            thisState = "false";

        var request = {
            request: "setLED",
            deviceType: "BalanceBoard",
            devNum: deviceNum,
            state: thisState,
            LED: 1
        };
        ws.send(JSON.stringify(request));
    }
    bBoardBatteryState({
        board
    }) {
        var boardNum = board.replace(/[^0-9]/g, '');
        return balBoardArray[boardNum].battery;
    }
    Connect({}) {
        /* first time connecton */
        if (ws === null) {
            console.log("connecting to server");
            ws = new WebSocket(dataURL);
            ws.onmessage = wsOnmessage;
            console.log(ws);
        } else if (!(ws.readyState == 1)) {
            console.log("connecting to server");
            ws = new WebSocket(dataURL);
            ws.onmessage = wsOnmessage;
            console.log(ws);
        } else {
            console.log("Connect: socket already connected");
        }
    }
    Disconnect({
        callback
    }) {
        if (!(ws === null)) {
            if (ws.readyState == 1) {
                console.log("disconnecting from server");
                ws.close();
            } else {
                console.log("Disconnect: socket already disconnected");
            }
        }
    }
    _formatMenu(menu) {
        const m = [];
        for (let i = 0; i < menu.length; i++) {
            const obj = {};
            obj.text = menu[i];
            obj.value = i.toString();
            m.push(obj);
        }
        return m;
    }
}
Scratch.extensions.register(new iiConnect2Scratch());
