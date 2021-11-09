const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "app.name",
        message: "Application name:",
        default: this.determineAppname(),
      },
      {
        type: "input",
        name: "app.version",
        message: "Application version:",
        default: "1.0.0",
      },
      {
        type: "input",
        name: "app.description",
        message: "Application description (optional):",
      },
    ]);
  }

  async writing() {
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), this);
  }

  async end() {
    this.log();
    this.log("Activating a trial Dasha.AI account...");
    await this.spawnCommand("npx", ["dasha", "account", "start-trial", "trial"]);
    this.log.ok("Trial account activated.");

    this.log();
    this.log.ok("You are all set to go!");
    this.log("To start a text chat, run 'npm start chat'.");
    this.log("To receive a phone call from Dasha, run 'npm start <phone-number>'.");
    this.log("The <phone-number> should be in international format.");

    this.log();
    this.log.ok("Check out the docs at https://docs.dasha.ai");
  }
};
