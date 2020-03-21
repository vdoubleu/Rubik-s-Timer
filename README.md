# Rubik-s-Timer

This is an improved version of my original [slap together timer](https://github.com/vdoubleu/slap-together-timer) and thus follows much the same philosophy. I wanted a simple Rubik's Cube timer that had a few features that I could not find anywhere else (without having to pay money). Most notably: start and stop using the spacebar, records solve times between sessions, graphing of the times, and multiple profiles for different cube types. I maintained all of these same functionalities from the original timer while keeping a simple and clean look. Some features such as line of best fit have not been brought over yet but there are plans to do so in the future.

The front-end is made using ReactJS with some help from Bootstrap. Ajax was used to make API calls to a Flask server that takes and records times to a Mongo database. Graphing was done using Recharts and should update dynamically.

To run, you simply need to run the command `num run dev` inside the client directory to start everything. You can also use docker-compose to run everything however you will need to make sure you have corsdisabled for it to function.

Start and stop the timer with spacebar. (The timer is setup in competition format, so be sure to hold it down until it turns green  before you start)

You can have different users/profiles and have different times associated with each one. To change, simply type in the name of the name you wish to swap to. By default, it is set to `defuser`. (default user)

You can import existing times by simply pasting the batch in the text box in bottom. Imported times should be in CSV format.

![](other/pic.png)
