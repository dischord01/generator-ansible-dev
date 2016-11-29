'use strict';
var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');
var shell  = require('shelljs');
var colors = require('colors');
var emoji = require('node-emoji');



module.exports = yeoman.Base.extend({
  prompting: function () {

    // Yeoman Prompts
    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'What is your Role name?',
      default : this.appname // Default to current folder name
    }];
    
    // console-png to create cool art
    console.log('---------------------------------');
    console.log(emoji.get('cow2') + '    Ansible Role generator   ' +  emoji.get('cow2'));
    console.log('---------------------------------');

    // Bind Answers 
    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  
  // END PROMPTING
  },

/* Creates the directory structure of the project */
  
  createFolderStructure: function () {
    this.log('creating folder structure');
    // create the src folder and its sub-directories
    var role_name = this.props.name
    var role_dir  = "roles/" + role_name
    console.log('----------------------------------')
    console.log(emoji.get('file_folder') + '  The new Role is roles/' + role_name.underline.cyan);
    console.log('----------------------------------')

    shell.mkdir(role_dir)

    shell.cd(role_dir)
    shell.mkdir('defaults')
    shell.mkdir('files')
    shell.mkdir('handlers')
    shell.mkdir('meta')
    shell.mkdir('tasks')
    shell.mkdir('templates')
    shell.mkdir('vars');
    
  // END CREATEFOLDERSTRUCTURE
  },


  writing: function () {
 
    this.fs.copyTpl(
      this.templatePath('defaults-main.yml'),
      this.destinationPath('roles/' + this.props.name + '/defaults/' + 'main.yml'), { name: this.props.name }
    );
    
    this.fs.copyTpl(
      this.templatePath('files-example.txt'),
      this.destinationPath('roles/' + this.props.name + '/files/' + 'example.txt'), { name: this.props.name }
    );
    
    this.fs.copyTpl(
      this.templatePath('handlers-main.yml'),
      this.destinationPath('roles/' + this.props.name + '/handlers/' + 'main.yml'), { name: this.props.name }
    );

    this.fs.copyTpl(
      this.templatePath('meta-main.yml'),
      this.destinationPath('roles/' + this.props.name + '/meta/' + 'main.yml'), { name: this.props.name }
    );

    this.fs.copyTpl(
      this.templatePath('tasks-main.yml'),
      this.destinationPath('roles/' + this.props.name + '/tasks/' + 'main.yml'), { name: this.props.name }
    );

    this.fs.copyTpl(
      this.templatePath('templates-example.j2'),
      this.destinationPath('roles/' + this.props.name + '/templates/' + 'example.j2'), { name: this.props.name }
    );

    this.fs.copyTpl(
      this.templatePath('vars-main.yml'),
      this.destinationPath('roles/' + this.props.name + '/vars/' + 'main.yml'), { name: this.props.name }
    );    

  //END WRITING
  }

  // install: function () {
  //   this.installDependencies();
  // }

});
