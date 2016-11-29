'use strict';
var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');
var mkdirp = require('mkdirp');
var colors = require('colors');
var emoji  = require('node-emoji');
var shell  = require('shelljs');

shell.config.silent = true;

module.exports = yeoman.Base.extend({
  prompting: function () {

    console.log('---------------------------------------------------');
    console.log(emoji.get('cow2') + '                                                ' +  emoji.get('cow2'));
    console.log(emoji.get('cow2') + '    Ansible and Vagrant development generator   ' +  emoji.get('cow2'));
    console.log(emoji.get('cow2') + '                                                ' +  emoji.get('cow2'));
    console.log('---------------------------------------------------');
    
    if (!shell.which('vagrant')) {
    echo('Sorry, this script requires Vagrant. https://www.vagrantup.com/downloads.html');
    exit(1);
    }

    // Get input from user
    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'What is your Playbook name?',
      default : this.appname // Default to current folder name
    },
    {
      type: 'list',
      name: 'box',
      message: function () {
        var vagrant_banner =
        '\n-----------------------------------------------------' +
        '\n' + emoji.get('package') + '  You have the following Vagrant Boxes installed  ' + emoji.get('package') +
        '\n' +                        '   Please choose a box for your Vagrantfile  ' +
        '\n-----------------------------------------------------';
        return vagrant_banner;
      },
      choices: function () {
        var box_list = shell.ls('~/.vagrant.d/boxes').stdout.split('\n');
        box_list.pop();
        box_list.push('centos/7');
        return box_list;
      },
      default: "centos/7",
      filter: function (box) {
        return box.toLowerCase();
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

/* Creates the directory structure of the project */
  
  createFolderStructure: function () {
    this.log('creating folder structure');
    // create the src folder and its sub-directories
    mkdirp.sync(this.destinationPath('group_vars'));
    mkdirp.sync(this.destinationPath('host_vars'));
    mkdirp.sync(this.destinationPath('roles'));
  
  var playbook_name = this.props.name

  console.log('----------------------------------');
  console.log(emoji.get('file_folder') + '  The new Playbook is ' + playbook_name.underline.cyan);
  console.log('----------------------------------');
  
  },


  writing: function () {
    
    this.fs.copyTpl(
      this.templatePath('Vagrantfile'),
      this.destinationPath('Vagrantfile'), { name: this.props.box }
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), { name: this.props.name }
    );
    
    this.fs.copy(
      this.templatePath('ansible.cfg'),
      this.destinationPath('ansible.cfg')
    );

    this.fs.copy(
      this.templatePath('site.yml'),
      this.destinationPath('site.yml')
    );

    this.fs.copy(
      this.templatePath('group_vars_example'),
      this.destinationPath('group_vars/example')
    );

    this.fs.copy(
      this.templatePath('inventory'),
      this.destinationPath('inventory')
    );

    this.fs.copy(
      this.templatePath('galaxy.yml'),
      this.destinationPath('galaxy.yml')
    );
  }

  // install: function () {
  //   this.installDependencies();
  // }
});
