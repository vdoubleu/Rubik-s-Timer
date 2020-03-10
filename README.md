# Rubik-s-Timer

This is an improved version of my original slap together timer. I maintained much of the same functionality while keeping a simple and clean look. The front-end is made using ReactJS with some help from Bootstrap. The entire setup is be based around a Flask framework that takes and records times to a Mongo database. Graphing was done using Recharts and should update dynamically.

To run, you simply need to run the command `num run dev` to start everything. 

Start and stop the timer with spacebar. (The timer is setup in competition format, so be sure to hold it down until it turns green  before you start)

You can have different users and have different times associated with each user. To change users, simply type in the name of the user you wish to swap to. By default, it is set to `defuser`. (default user)

You can import existing times by simply pasting the batch in the text box in bottom. 

![](other/pic.png)
