# Assignment



## Requirements

For development, you will only need Node.js and a node global package, 

### Node

- #### Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.

Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

$ sudo apt install nodejs

$ sudo apt install npm

- #### Other Operating Systems

You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

$ node --version

v8.16.2

$ npm --version

6.4.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

$ npm install npm -g

###

---

## Install

$ git clone https://gitlab.com/hari22/nuffsaid-coding-challenge.git

$ cd nuffsaid-coding-challenge

$ npm install

## Running the project in localhost

$ npm start

**Part 1 of assignment**
Open url: localhost:3000 in browser 

**Part 2 of assignment**
Open file routes/index.js and provide text to search at line 6.
Example:
const  searchText = "SCHOOL - CHALKVILLE SEQUOYAH CAMPUS";

## Scope of improvements

 **UX Side**
 
 - Search box and a click button with auto complete feature
 - Better layout and design 

**Performance**

 - Caching: No caching has been implemented to handle the same data searched again  
 - Data Indexing: data could be hosted on an elastic search for a faster experience  
 - Search Algorithm: There are other scenarios, which could improve the speed like grouping school name, city, and state identifier.  
 - Search algorithm(another approach): if data in CSV or JSON is in alphabetical order then we can start the search for start index of that letter only. Like: real-world scenario: **Phone directory**

**Code Quality**

 - Integration with code climate

**Hosting**

 - Hosting code to server(Ec2) or App engine
