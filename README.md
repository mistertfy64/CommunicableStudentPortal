# DEVELOPMENT HAS CAME TO A HALT UNTIL FURTHER NOTICE.

# CommunicableStudentPortal
An open-source student portal with "social media" capabilities.

[![CodeFactor](https://www.codefactor.io/repository/github/mistertfy64/communicablestudentportal/badge)](https://www.codefactor.io/repository/github/mistertfy64/communicablestudentportal)

This project is created for [Mahidol University International College's Young Tech Creator (myTech) Challenge 2022](https://muic.mahidol.ac.th/eng/muic-young-tech-creator-mytech-challenge-2022/) by mistertfy64, Taweikung09, and Enchantingplayz.

**Currently this project is in its Proof of Concept stage.** Therefore, project is incomplete, and is not recommended for serious/commerical/academic usage (as of 2022-06-08).

## (Planned) Features
- Fully customizable. (partially complete, check CSS file for details)
- Integration with existing student portal software. ([partially complete](https://github.com/mistertfy64/CommunicableStudentPortal/wiki/HTTP-API))
- Leaderboards for various stuff. (partially complete)
- Interactive setup wizard. (partially complete)
- Private*!
- Completely free to use and maintain**! ([pls donate to mistertfy64](https://www.patreon.com/mistertfy64))

\*You may restrict access to students only, or make it public, some configuration may be required.

\*\*CommunicableStudentPortal is free to download, use, and maintain. However, maintaining may require costs from your server provider (but not from the creators). Check your server provider for details.

## Setting Up

### Part 0: Before Downloading the Source Code

Get a [MongoDB](https://www.mongodb.com/) cluster, then create a database.

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

Copy all the files in the `defaults` folder to the `server` folder.

(Note: You don't have to do this, however, it is highly recommended that you do. The reason is that not copying this file will use the developers' configuration file. Moreover, CommunicableStudentPortal requires a `.env` file to properly run and connect to the database.)

After that, run the `node` app.

```
node server.js
```

If you copied the files in the default folder, a welcome message should pop up. Follow the directions. After you're done with the initial setup process, the app will stop, so you need to start it again.
