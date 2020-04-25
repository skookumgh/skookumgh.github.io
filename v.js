class pingas {
  constructor() {}
  getInfo() {
    return {
      id: 'pingas',
      name: 'Pingas!',
      color1: '#00daee',
      color2: '#00daee',
      color3: '#00747f',
      menuIconURI: meme,
      blockIconURI: meme,
      blocks: [
        {
          opcode: 'testReporter',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Pingas',
            },
          },
          text: 'Pingas [A]',
        },
        {
          opcode: 'testHat',
          blockType: Scratch.BlockType.HAT,
          text: 'Pingas',
        },
        {
          opcode: 'testCommand',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Pingas [A]',
          arguments: {
            A: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Pingas',
            },
          },
        },
        {
          opcode: 'testVar',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Pingas',
        },
      ],
    }
  }
  testReporter({ A }) {
    return A
  }
  testHat() {
    return
  }
  testCommand({ A }) {
    return
  }
  testVar() {
    return 'Pingas'
  }
}
Scratch.extensions.register(new pingas())
