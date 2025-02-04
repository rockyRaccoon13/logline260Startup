# What is node/npm
**node** is a run-time JS is a runtime env outside of env that allows JS to be run on an OS (rather than inside a browser).

It is built on V8 engine (interpreter) -- same as chromium browsers

**npm** is a package manager for installing packages and managing dependencies, running scripts, etc.

## running js with node

`node` - for interpretive mode
`node -e "inline js"` - to execute js line
`node file.js` - to run js file

create projects and run them using npm


# node project parts
`package.json` (from npm init. lists project scripts, dependencies, etc.)
`lock-package.json` (after first package install keeps versions of dependencies)
`node_modules` where installed package files/modules reside (**very costly for version control -- add to git ignore**)


## How to create a node proj
1. Create your project directory
1. Initialize it for use with NPM by running `npm init -y`
1. Make sure `.gitignore` file contains `node_modules`
1. Install any desired packages with `npm install <package name here>`
1. Add `require('<package name here>')` to your application's JavaScript
1. Use the code the package provides in your JavaScript
1. Run your code with `node index.js`


# when you clone a node proj
install project dependencies with `npm install`


# debugging javascript
dev tools inspector in browser

# debugging node

`node --watch <>` restarts code when change occurs in source

in vs code create a launch file and specify --watch arg. this will restart debug whenever change occurs

    In VS Code press CTRL-SHIFT-P (on Windows) or ⌘-SHIFT-P (on Mac) and type the command Debug: Add configuration. Select the Node.js option. This will create a launch configuration named .vscode/launch.json. Modify the configuration so that it includes the --watch parameter. This should look something like the following.

