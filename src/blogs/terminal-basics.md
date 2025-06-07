---
title: "Terminal Basics: A Comprehensive Guide for Beginners"
datePublished: 2023-03-19
tags: ['guide']
---

## Introduction to the terminal

As a beginner, have you ever been intimidated by the terminal? Well, fear not! In this beginner's guide, we will take you through the basics of the terminal, its anatomy, and some basic commands in a language that even a dummy can understand. Whether you've tried watching countless YouTube tutorials or reading other blogs, this guide will break down everything you need to know about the terminal in a fun and engaging way. So, sit back, relax, and let's dive into the world of terminal together!

> Note: This guide is tailored for Linux and Macintosh users. Regrettably, Windows users will be unable to utilize the commands as they are presented in this blog. Nevertheless, you may explore alternative Windows commands that mirror the provided terminal commands.

One final note to add is that there is no need for you to memorize all of these commands. Even I don't have them all committed to memory. The key is to search for them on Google and then put them to use. What truly matters is your understanding of these commands, which is far more important than simply memorizing them.

### Why is it important to get familiar with the terminal?

A terminal is an indispensable tool for any developer, regardless of their specialization, be it web development or machine learning, or whether they are a software engineer or an operations engineer. Throughout your career, the terminal will remain a vital component of your work.

Throughout your career, you will encounter countless tools, such as **Git**, **Node**, and many others, that rely on the terminal for their operation. However, many beginners find the terminal to be intimidating and may not grasp its significance. As a result, you must become familiar with the terminal early on, as you will spend a significant amount of time using it.

## Anatomy of a command

### Commands Name

**The command name is the initial word you enter in the terminal to execute a specific program or function**. This word instructs the computer on which program to run and which arguments and flags to expect next. In essence, the command name serves as a directive to the computer on how to proceed.

As an illustration, consider the command `whoami` (which we will cover in more detail later). When you enter this command in the terminal, it informs the terminal that you wish to execute a specific function. The terminal then evaluates the command and proceeds to execute the function, which in this case returns the username of the individual currently using the terminal.

![whoami command](https://cdn.hashnode.com/res/hashnode/image/upload/v1679080997003/43980c0e-f857-45d7-8653-9b6dfccfbbc5.png)

As demonstrated, when you type `whoami` in the terminal, it returns your username, such as `inclinedadarsh`. Now, feel free to open your terminal and enter the command `whoami` to see the result for yourself.

Yay 🎉, we just wrote our first command!

### Arguments / Parameters

**Arguments or parameters are input values that follow the command name and provide the terminal with additional information on how to proceed with the command**. The `touch` command is a prime example of a command that relies on arguments. When you use the `touch` command, you create a new file with a name that is passed as an argument (the name of the file to be created is written after the `touch` command).

![touch command](https://cdn.hashnode.com/res/hashnode/image/upload/v1678965974554/76c751ad-7af4-45fb-af22-06089787cb87.png)

As illustrated, when you do not provide an argument with the `touch` command (i.e., do not write anything after the `touch` command), an error occurs. However, when you pass a filename as an argument after the `touch` command, no error is produced, indicating that the command has run successfully. Upon checking, you will notice that a new file with the name `hello_world.txt` has been created in the current directory.

It is important to note that not all commands require arguments, such as the `whoami` command we saw earlier. This command is self-sufficient and does not require any additional input values.

### Flags / Options

**Flags are small pieces of information that can be passed to provide additional details about a command**. Flags are typically denoted by either a single hyphen (used for character flags, e.g., `-a`) or a double hyphen (used for string flags, e.g., `--all`). The key difference between arguments and flags is that flags are boolean values. In other words, many times, the command can function without flags, and they only alter the behaviour of the execution by their presence.

One excellent example of the use of flags is with the `ls` command. The `ls` command is self-sufficient and returns the names of all the folders and files (excluding hidden files) inside your current directory. However, when the `-a` (or `--all`) flag is passed, it displays all the folders and files, including the hidden ones.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1678967251478/8693dc22-e5d9-423b-9b81-9fd06ae44dc8.png)

As you can see, when I ran the `ls` command, it returned only the names of visible files. However, when I typed the `ls -a` command, it returned the names of all files, including the hidden ones. Therefore, the `-a` flag modifies the behaviour of the execution to either show or not show hidden files, depending on its presence or absence, respectively. Now, you can open your terminal and type the ls command to view all the files and folders in your current directory.

### File System

**Bash works by organizing your computer's files and folders into a hierarchical structure. You are always in a folder (also called a directory) when using the terminal, and you can navigate through the directories to find and access files. This system is similar to using File Explorer or Finder on your computer.**

**The root directory is the parent folder of all the folders and files**. It is denoted by the `/` symbol.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1678974866718/617b979a-7757-488c-b33a-ab12ff2fa73c.png)

As you can see, above is the file system of my own computer. Well, there were a lot more folders and files, but I simplified it for your understanding. So as we can see, the Root folder contains all the folders inside itself and is denoted by `/` .

**The folder you're currently in is called your** `current directory`**.** In my case, my current directory is the `inclinedadarsh` folder shown in the diagram. Just like how the Root directory is represented by the symbol `/`, the current directory is represented by the symbol `.` In the diagram, you can see that there's a `.` in front of the `inclinedadarsh` folder name, which means it's my current directory.

Now let's understand what a path is. A **path is quite literally the path to a folder/directory.** There are 2 types of paths: Absolute path & Relative path.

#### Absolute Path

**Absolute path is the path to a directory form the root directory.** The absolute path (path from the root directory) to the `csgo.exe` file will be as shown below:

```plaintext
/home/inclinedadarsh/Games/csgo.exe
```

Let's understand this path. It starts from a `/`, which means that this path is from the root directory. Any path that starts with the root directory is absolute. `home/inclinedadarsh` means that the `inclinedadarsh` folder is inside the `home` folder and similarly `inclinedadarsh/Games/csgo.exe` means that the `csgo.exe` file is inside the `Games` folder which is then inside the `inclinedadarsh` folder.

#### Relative Path

**Relative path is the path to a directory from the current directory.** The relative path (path from current (i.e. `inclinedadarsh`) to the game `csgo.exe` will be as follow:

```plaintext
./Games/csgo.exe
```

The `.` in the starting means that this path is from the current directory (because `.` means current directory).

Navigating one level down from the current directory is straightforward - simply use `./` followed by the name of the desired directory, such as `./Games`" But how does one navigate one level up, for instance, to select the home directory from the current directory (i.e. `inclinedadarsh`)? The solution is to use two dots `..` to denote the parent directory. Although it may appear confusing at first, it is quite simple - to select the directory one level up, use `..`  
Now, referring to the file system shown in the diagram again, let's see how can we write a path from `include` directory to `software.deb` file assuming that `include` is our current directory.

```plaintext
./../../home/inclinedadarsh/Downloads/software.dev
```

A simple explanation is given below:  
`.` (current directory: `include`) --&gt; `..` (one level up: `usr`) --&gt; `..` (one level up: `Root`) --&gt; `home` --&gt; `inclinedadarsh` --&gt; `Downloads` --&gt; `software.dev`

Now for yourself try writing the path from `Games` to `cache` assuming that `cache` is your current directory. Write the answer in the comment section below this blog.

### Getting help: `--help`

Commands in the terminal can be confusing at times, which is why the terminal provides a special flag called `--help`. When this flag is used, the terminal will display the command's usage, description, and list of available arguments and flags that can be used in conjunction with the command.

Personally, I find myself forgetting certain commands and their corresponding arguments quite frequently, which is why I find the `--help` flag to be an extremely useful tool. I would highly recommend using it whenever you encounter an unfamiliar command or need a refresher on a command's usage.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679120962211/baa894a3-6d5b-4127-8e48-ed68207ef314.png)

> Remember that `--help` flag works with every command and I won't be mentioning it with every command.

### Super Users Do (`sudo`)

As you may already be aware, it is possible to create different users with different permissions on a computer to allow multiple people to use it. These permissions limit certain users from accessing particular directories or executing specific commands.

**The root user is a superuser who has access to all directories, files, and permission to execute any command on the computer**. On the other hand, other users have restricted access and cannot execute certain commands or access specific files.

In cases where a user requires permission to execute a restricted command, they must type `sudo` before the command. This essentially means that the user will be acting as a root user solely for that command, informing the terminal that a root user is now executing the command rather than a normal, restricted user. The terminal will then prompt the user for the administrator (root user) password, and upon successful authentication, the command will execute as a root user.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679121652671/95b2d3aa-f12e-48b3-bbe4-1ba18bd17965.png)

As you may have noticed, when I run the `whoami` command in the terminal, it displays my username (e.g. `inclinedadarsh`). However, if I type `sudo whoami` and enter my password, the terminal will now display `root` instead of my username. This is because the "sudo" command enables me to execute the `whoami` command as a root user, which has different permissions and privileges than a regular user.

Woah woah woah, that's a lot of theory and few commands. Now let's straight get into basic Terminal commands that I use every day and you'll be using them a lot too.

## Basic Linux Commands

### Who Am I? - `whoami`

The `whoami` command is used to display the current user's username in the terminal. Similarly, some commands have a `--version` flag which displays the version of the command. This flag can help check which version of a program or utility you are running.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679122414811/e2466ad2-59f0-4224-a6b1-38777baa0264.png)

### Print Working Directory - `pwd`

The `pwd` command prints the absolute path to your current working directory.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679122303999/8e7ce3c4-eecf-440c-9fd9-da32097588d4.png)

### List - `ls`

The `ls` command is used to list all the files and directories in the current working directory. It has several flags that can modify its behaviour. For example, the `-a` or `--all` flag can be used to display all files and directories in the current directory, including hidden files.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679122597921/e46923f9-a8b0-483e-9d16-7f4cb5c6343e.png)

You can check out more about it using the `ls --help` command.

### Change Directory - `cd`

We haven't talked about changing directories yet. Well, here we go. To change a directory the `cd` command is used as follows:

```bash
$ cd path/to/a/folder
```

The `cd` command is used to change the current working directory. You need to specify the path to the directory you want to go to after the `cd` command. The path can be either a relative or an absolute path.

You can check if you have changed your directory or not using the `pwd` command.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679123049479/6eeda925-7661-427c-81dd-c970837d1efc.png)

As you can see, I can either use `cd ./Pictures/Screenshots` or `cd /home/inclinedadarsh/Pictures/Screenshots` and they both will take me to the Screenshots directory. This can be verified using the `pwd` command.

### Make Directory - `mkdir`

The `mkdir` command is used to create a new directory within the current directory. To use the command, simply pass the name of the new directory as an argument. After executing the command, you can verify whether the new directory has been created or not by using the `ls` command.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679159109528/2616cf83-744c-4f00-8dd9-735ffab6fd7a.png)

### Remove - `rm`

The `rm` command is used to remove files. It is expected that you will pass the path (relative or absolute) as an argument to the command.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679159383817/a5a31cb2-005c-4bda-af57-4bbb31678aea.png)

The `rm` does not remove directories by default though. You have to use the `-r` (or `-R` or `--recursive`) to remove a directory.

### Copy - `cp`

The `cp` command is used to copy a file or folder/directory to another file and/or with another name. You have to pass the path to the file you have to copy from and the path of the file you have to copy to as the two arguments to the command.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679159889639/5aaa4595-0fa2-4829-8abb-3c45aad9eb4f.png)

### Move - `mv`

The `mv` command is used to move the contents of one file or folder to another file or folder. Just like the `cp` command, it is expected to get the path of the file you have to move and the path of the new file.

One really common way people use `mv` command is to rename files. It's basically moving the file into the same folder with some other name.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679160298445/b3e830fa-e111-4145-95fc-466c5344083a.png)

### History - `history`

The `history` command is used to see the history of all the commands you have typed in your terminal till now.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679160652727/9c5e1ea6-7b8c-4914-a042-d4feb19d2dd5.png)

Go ahead, type `history` and see all the commands you have ran till now.

### Clear - `clear`

After running so many commands, your terminal might look really filled up and not clean. Hence, the `clear` command is used to clear the terminal so it looks clean and tidy.

### Opening Gedit - `gedit`

Gedit is the text editor for Gnome-based Linux distributions. You can use the `gedit` command to open the Gedit text editor to edit a file. It expects the file name as an argument. When you try to open a file in the Gedit text editor, it opens the file if it exists already or creates a new one if it doesn't exist.

### Nano - `nano`

Nano is yet another text editor of Linux, but it works inside the terminal itself. Similar to `gedit`, `nano` expects the file name as an argument to the command. It also creates a new file if the given name doesn't exist.

You can open a file inside Nano text editor using the nano command.

### Manual - `man`

`man` is a special command that expects any other command name as an argument. It returns the manual of the command that was passed as an argument.

You can use this command when you need help and the `--help` flag doesn't provide enough information about a command.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1679163037742/5c6ee080-0572-4649-9b3f-42456fb94720.png)

### Exit - `exit`

This command is self-explanatory. It closes the terminal. There's nothing I can explain about this command, it just closes itself. Try it yourself.

---

## Conclusion

Great! So, the most crucial takeaway from this blog is comprehending how the file system operates and understanding the anatomy of the command. It is not crucial to memorize every single command; the more you use them, the more comfortable you will become with them and the more you will retain them in your memory. In the meantime, you can always search for the commands on Google and use them as needed.

I will try to make a YouTube tutorial on this very blog, so if it happens then I'll edit the blog and put the link at the end.

That's for this blog folks. If you like the blog then don't forget to like it. Share it with your classmates so that they can understand the terminal as well. You can find me on Twitter as [inclinedadarsh](https://twitter.com/inclinedadarsh) and you can find my online presence [here](https://bio.link/inclinedadarsh).

I am Adarsh Dubey, signing off.