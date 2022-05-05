# CommunicableStudentPortal
An open-source student portal with "social media" capabilities.

This project is created for [Mahidol University International College's Young Tech Creator (myTech) Challenge 2022](https://muic.mahidol.ac.th/eng/muic-young-tech-creator-mytech-challenge-2022/) by mistertfy64.

**Currently this project is in its Proof of Concept stage.** Therefore, project is incomplete.

## Setting Up
### Part 1: Downloading the Source Code

(Note: If you plan on using this seriously, please fork the repository on GitHub first.)

Clone the repository:
```
git clone https://github.com/mistertfy64/CommunicableStudentPortal
```
(or your forked repository)


Change the current working directory:
```
cd CommunicableStudentPortal
```

Install the required `npm` modules:
```
npm install
```

### Part 2: Setting Up CommunicableStudentPortal

Copy all the files in the `defaults` folder to the root directory.

(Note: You don't have to do this, however, it is highly recommended that you do. The reason is that not copying this file will use the developers' configuration file. Moreover, CommunicableStudentPortal requires a `.env` file to properly run and connect to the database.)

After that, run the `node` app.

```
node server.js
```

If you copied the files in the default folder, a welcome message should pop up. Follow the directions. After you're done with the initial setup process, the app will stop, so you need to start it again.
