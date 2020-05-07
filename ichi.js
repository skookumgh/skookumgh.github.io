var IchigoJamUtil = IchigoJamUtil || {};
IchigoJamUtil.bDebug = true;
IchigoJamUtil.log = (s) => {
	if (IchigoJamUtil.bDebug) console.log(s);
};

const IchigoJamCommandArgument = {
	OUT: {
		STOP: 0,
		FORWARD: 33,
		BACK: 18,
		SLOWRIGHT: 1,
		QUICKRIGHT: 17,
		SLOWLEFT: 32,
		QUICKLEFT: 34
	},
	WAIT: {
		QUATER_S: 15,
		HALF_S: 30,
		ONE_S: 60,
		THREE_S: 180,
		FIVE_S: 300,
		TEN_S: 600
	},
	LED: {
		ONE: 1,
		ZERO: 0
	},
	LABEL: {
		ONE: '@1',
		TWO: '@2',
		THREE: '@3',
		FOUR: '@4'
	},
	PWM_F: {
		LEFT: '3',
		RIGHT: '4'
	},
	PWM_S: {
		LOW: '60',
		MIDDLE: '145',
		HIGH: '230'
	}
};


class SerialPort {
	static get WS_ADDRESS() {
		return 'ws://localhost:30110/serial/';
	}

	constructor() {
		this._ws = new WebSocket(SerialPort.WS_ADDRESS);
		this._ws.addEventListener('message', (event) => {
			let val;
			try {
				val = JSON.parse(event.data).value;
			} catch (e) {
				val = '';
			} finally {
				console.log(`<--    ${val}`);
			}
		});
	}

	sendJson(json) {
		if (this._ws.readyState !== this._ws.OPEN) {
			console.log('IchigoJam extension : connection error!!');
			return;
		}

		if (json.value) console.log(`   --> ${json.value}`);
		const sData = JSON.stringify(json);
		this._ws.send(sData);
	}

	sendText(message) {
		this.sendJson({
			type: 'text',
			value: message
		});
	}

	sendEscape() {
		this.sendJson({
			type: 'esc'
		});
	}

	// setSpeed(speed) {
	// 	this.sendJson({
	// 		type: 'speed',
	// 		value: speed
	// 	});
	// }
}


/**
 * Manage communication with a IchigoJam peripheral over a Ichigo-Link clienet socket
 */
class IchigoJam {
	constructor() {
		this._serialport = new SerialPort();

		this._bAddingLineNumber = false; // コマンドのみで実行する機能を使う場合
		this.initLineNumber();
	}

	initLineNumber() {
		this._nLineNumber = 0;
	}

	incrementLineNumber() {
		this._nLineNumber++;
	}

	/*
	send command method
	*/
	send(s) {
		this._serialport.sendText(s);
	}

	sendCommand(command) {
		this.incrementLineNumber();

		let sCommand;
		if (this._bAddingLineNumber) {
			sCommand = `${this._nLineNumber} ${command}`;
		} else {
			sCommand = `${command}`;
		}

		this.send(sCommand);
	}

	sendNewCommand() {
		this.initLineNumber();
		this._bAddingLineNumber = true;
		this._serialport.sendEscape();
		this.send('NEW');
	}

	sendSaveCommand(nSlot) {
		this.initLineNumber();
		this._bAddingLineNumber = false;
		this.send(`SAVE ${nSlot}`);
	}

	sendRunCommand() {
		this.initLineNumber();
		this._bAddingLineNumber = false;
		this.send('RUN');
	}
}

class Scratch3IchigoJamBlocks {
	constructor(runtime) {
		this.manager = new IchigoJam();
		this._runtime = runtime; // undefined
	}

	get OUT_ARGUMENTS_MENU() {
		return [
			{
				text: {
					id: 'ichigojam.outArgumentsMenu.stop',
					default: '0',
					description: 'out argument 0'
				},
				value: IchigoJamCommandArgument.OUT.STOP
			},
			{
				text: {
					id: 'ichigojam.outArgumentsMenu.forward',
					default: '33',
					description: 'out argument 33'
				},
				value: IchigoJamCommandArgument.OUT.FORWARD
			},
			{
				text: {
					id: 'ichigojam.outArgumentsMenu.back',
					default: '18',
					description: 'out argument 0'
				},
				value: IchigoJamCommandArgument.OUT.BACK
			},
			{
				text: {
					id: 'ichigojam.outArgumentsMenu.sleft',
					default: '32',
					description: 'out argument 32'
				},
				value: IchigoJamCommandArgument.OUT.SLOWLEFT
			},
			{
				text: {
					id: 'ichigojam.outArgumentsMenu.qleft',
					default: '34',
					description: 'out argument 34'
				},
				value: IchigoJamCommandArgument.OUT.QUICKLEFT
			},
			{
				text: {
					id: 'ichigojam.outArgumentsMenu.sright',
					default: '1',
					description: 'out argument 1'
				},
				value: IchigoJamCommandArgument.OUT.SLOWRIGHT
			},
			{
				text: {
					id: 'ichigojam.outArgumentsMenu.qright',
					default: '17',
					description: 'out argument 17'
				},
				value: IchigoJamCommandArgument.OUT.QUICKRIGHT
			}
		];
	}

	get WAIT_ARGUMENTS_MENU() {
		return [
			{
				text: {
					id: 'ichigojam.waitArgumentsMenu.quatersec',
					default: '15',
					description: 'wait argument 15'
				},
				value: IchigoJamCommandArgument.WAIT.QUATER_S
			},
			{
				text: {
					id: 'ichigojam.waitArgumentsMenu.halfsec',
					default: '30',
					description: 'wait argument 30'
				},
				value: IchigoJamCommandArgument.WAIT.HALF_S
			},
			{
				text: {
					id: 'ichigojam.waitArgumentsMenu.onesec',
					default: '60',
					description: 'wait argument 60'
				},
				value: IchigoJamCommandArgument.WAIT.ONE_S
			},
			{
				text: {
					id: 'ichigojam.waitArgumentsMenu.threesec',
					default: '180',
					description: 'wait argument 180'
				},
				value: IchigoJamCommandArgument.WAIT.THREE_S
			},
			{
				text: {
					id: 'ichigojam.waitArgumentsMenu.fivesec',
					default: '300',
					description: 'wait argument 300'
				},
				value: IchigoJamCommandArgument.WAIT.FIVE_S
			},
			{
				text: {
					id: 'ichigojam.waitArgumentsMenu.tensec',
					default: '600',
					description: 'wait argument 600'
				},
				value: IchigoJamCommandArgument.WAIT.TEN_S
			}
		];
	}

	get LED_ARGUMENTS_MENU() {
		return [
			{
				text: {
					id: 'ichigojam.ledArgumentsMenu.zero',
					default: '0',
					description: 'led argument 0'
				},
				value: IchigoJamCommandArgument.LED.ZERO
			},
			{
				text: {
					id: 'ichigojam.ledArgumentsMenu.one',
					default: '1',
					description: 'led argument 1'
				},
				value: IchigoJamCommandArgument.LED.ONE
			}
		];
	}

	get LABEL_ARGUMENTS_MENU() {
		return [
			{
				text: {
					id: 'ichigojam.labelArgumentsMenu.one',
					default: '@1',
					description: 'label 1'
				},
				value: IchigoJamCommandArgument.LABEL.ONE
			},
			{
				text: {
					id: 'ichigojam.labelArgumentsMenu.two',
					default: '@2',
					description: 'label 2'
				},
				value: IchigoJamCommandArgument.LABEL.TWO
			},
			{
				text: {
					id: 'ichigojam.labelArgumentsMenu.three',
					default: '@3',
					description: 'label 3'
				},
				value: IchigoJamCommandArgument.LABEL.THREE
			},
			{
				text: {
					id: 'ichigojam.labelArgumentsMenu.four',
					default: '@4',
					description: 'label 4'
				},
				value: IchigoJamCommandArgument.LABEL.FOUR
			}
		];
	}

	get PWM_F_ARGUMENTS_MENU() {
		return [
			{
				text: {
					id: 'ichigojam.pwmFArgumentsMenu.left',
					default: '3',
					description: 'pwm f 3'
				},
				value: IchigoJamCommandArgument.PWM_F.LEFT
			},
			{
				text: {
					id: 'ichigojam.pwmFArgumentsMenu.right',
					default: '4',
					description: 'pwm f 4'
				},
				value: IchigoJamCommandArgument.PWM_F.RIGHT
			}
		];
	}

	get PWM_S_ARGUMENTS_MENU() {
		return [
			{
				text: {
					id: 'ichigojam.pwmSArgumentsMenu.low',
					default: '60',
					description: 'pwm s 60'
				},
				value: IchigoJamCommandArgument.PWM_S.LOW
			},
			{
				text: {
					id: 'ichigojam.pwmSArgumentsMenu.middle',
					default: '145',
					description: 'pwm s 145'
				},
				value: IchigoJamCommandArgument.PWM_S.MIDDLE
			},
			{
				text: {
					id: 'ichigojam.pwmSArgumentsMenu.high',
					default: '230',
					description: 'pwm s 230'
				},
				value: IchigoJamCommandArgument.PWM_S.HIGH
			}
		];
	}

	getInfo() { // 拡張機能の各種情報
		return {
			id: 'ichigojam',
			name: 'IchigoJam', // 拡張機能の名前
			blocks: [ // 各ブロックの定義
				{
					opcode: 'commandNew', // 実行する関数の名前
					text: {
						id: 'ichigojam.new',
						default: 'IchigoJam NEW',
						description: 'IchigoJam NEW'
					},
					blockType: Scratch.BlockType.COMMAND,
					arguments: {}
				},
				///////////
				{
					opcode: 'commandLed',
					text: {
						id: 'ichigojam.led',
						default: 'IchigoJam LED[ARG]',
						description: 'IchigoJam LED'
					},
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						ARG: {
							type: Scratch.ArgumentType.NUMBER,
							menu: 'ledArguments',
							defaultValue: IchigoJamCommandArgument.LED.ZERO
						}
					}
				},
				///////////
				{
					opcode: 'commandOut',
					text: {
						id: 'ichigojam.out',
						default: 'IchigoJam OUT [ARG]',
						description: 'IchigoJam OUT'
					},
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						ARG: {
							type: Scratch.ArgumentType.NUMBER,
							menu: 'outArguments',
							defaultValue: IchigoJamCommandArgument.OUT.STOP
						}
					}
				},
				///////////
				{
					opcode: 'commandPwm',
					text: {
						id: 'ichigojam.pwm',
						default: 'IchigoJam PWM [ARGF], [ARGS]',
						description: 'IchigoJam PWM'
					},
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						ARGF: {
							type: Scratch.ArgumentType.NUMBER,
							menu: 'pwmfArguments',
							defaultValue: IchigoJamCommandArgument.PWM_F.LEFT
						},
						ARGS: {
							type: Scratch.ArgumentType.NUMBER,
							menu: 'pwmsArguments',
							defaultValue: IchigoJamCommandArgument.PWM_S.LOW
						}
					}
				},
				///////////
				{
					opcode: 'commandWait',
					text: {
						id: 'ichigojam.wait',
						default: 'IchigoJam WAIT[ARG]',
						description: 'IchigoJam WAIT'
					},
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						ARG: {
							type: Scratch.ArgumentType.NUMBER,
							menu: 'waitArguments',
							defaultValue: IchigoJamCommandArgument.WAIT.ONE_S
						}
					}
				},
				////////////
				{
					opcode: 'commandGoto',
					text: {
						id: 'ichigojam.goto',
						default: 'IchigoJam GOTO[ARG]',
						description: 'IchigoJam GOTO'
					},
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						ARG: {
							type: Scratch.ArgumentType.STRING,
							menu: 'labelArguments',
							defaultValue: IchigoJamCommandArgument.LABEL.ONE
						}
					}
				},
				////////////
				{
					opcode: 'commandLabel',
					text: {
						id: 'ichigojam.label.',
						default: 'IchigoJam [ARG]',
						description: 'IchigoJam Label'
					},
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						ARG: {
							type: Scratch.ArgumentType.STRING,
							menu: 'labelArguments',
							defaultValue: IchigoJamCommandArgument.LABEL.ONE
						}
					}
				},
				////////////
				{
					opcode: 'commandSave',
					text: {
						id: 'ichigojam.save',
						default: 'IchigoJam SAVE',
						description: 'IchigoJam SAVE'
					},
					isTerminal: true,
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
					}
				},
				////////////
				{
					opcode: 'commandRun',
					text: {
						id: 'ichigojam.run',
						default: 'IchigoJam RUN',
						description: 'IchigoJam RUN'
					},
					isTerminal: true,
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
					}
				},
			], // blocks
			menus: {
				outArguments: this.OUT_ARGUMENTS_MENU,
				waitArguments: this.WAIT_ARGUMENTS_MENU,
				ledArguments: this.LED_ARGUMENTS_MENU,
				labelArguments: this.LABEL_ARGUMENTS_MENU,
				pwmfArguments: this.PWM_F_ARGUMENTS_MENU,
				pwmsArguments: this.PWM_S_ARGUMENTS_MENU
			} // menus
		};
	} // getInfo()


	/////////////////////
	// block opcode
	/////////////////////
	commandNew() {
		this.manager.sendNewCommand();
	}

	commandSave() {
		this.manager.sendSaveCommand(0);
	}

	commandRun() {
		this.manager.sendRunCommand();
	}

	commandGoto({ ARG }) {
		this.manager.sendCommand(`GOTO ${ARG}`);
	}

	commandLabel({ ARG }) {
		this.manager.sendCommand(`${ARG}`);
	}

	commandLed({ ARG }) {
		this.manager.sendCommand(`LED ${ARG}`);
	}

	commandOut({ ARG }) {
		this.manager.sendCommand(`OUT ${ARG}`);
	}

	commandWait({ ARG }) {
		this.manager.sendCommand(`WAIT ${ARG}`);
	}

	commandPwm({ ARGF, ARGS }) {
		this.manager.sendCommand(`PWM ${ARGF},${ARGS}`);
	}
}

Scratch.extensions.register(new Scratch3IchigoJamBlocks());
