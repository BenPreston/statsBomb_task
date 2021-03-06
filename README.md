# Technical Test for Statsbomb Web Developers

Use npm to start.

For this task I thought that ideally there would be a home page that contained mini data on scores and player statistics.

As I knew this was too ambitious in the time frame I went straight to the the matches. Which can be found at route:

http://localhost:3000/games

Here I mapped through every game to get the scores. I used the team colors to name the team names, which is not the most attractive solution and not one I would stick with. I had planned to do something slightly more interesting like gradiented background but I didn't have time. However, I wanted to pull through and use the variable just to ensure it was working ok.

As some games went to penalites I created a div to show this score if it was available and make sure it stayed blank if not.

I had planned to order these games logically and have selectors for a given team but I didn't get to this point.

Over time I would have a nav bar to direct me to different stats places too.

http://localhost:3000/games/:gameID

I created routes for each game. I had planned to create a team line up or cards for each player but on using the data I realised that actually you hadn't included all 22 players plus subs so it didn't seem worth while.

I would have wanted to do something a bit more interesting though. With a bit more time I would have made these styled cards. I could have even just used materialize or bootstrap.

The idea for the data was that I could first produce all of the data and then through calculations have worked out how a given player did in the game.

Ultimately I was going to use this not only to display some of this info using D3 or a materialize dashboard, possibly even an SVG to demonstrate the data.

What I really wanted to do with the percentage was to be able to dynamically score the players and even create match reports for them.

I would have done a series of if lookups so for instance if xg was much higher than goals you would say they were very poor in front of goal. If a player was responsible for over X% of all completed passes you would say the game flowed through them and so on.

I would also have cleaned up the data as clearly things like player_id look ugly and in some cases (like that one) unnecessary.

# Questions

1. Why did you choose the frameworks or libraries that you did?

I chose React as I've worked with it before. I used a little bit of Bootstrap and I was going to use that d3 and Materialize to create proper styling.

2. What would you have done differently given infinite time?

I started by making a server but realised this was not really required as part of the project. However I would with infinite time.

I would also create a global state management with say Redux.

I would anticipate having full line ups as well as images of the players and build a card based system to view them better.

I would also aggregate all of the data for team and game percentage as explained above. This would lead on to graphs below as well as autogenerated match reports.

I understand data visualisation was a key element to the project and had planned to make a radar which I would have probably made on an SVG to show this data. I actually planned to make some bar graphs based on passes per player and split the data in to defence and attack to make it clearer.

3. What issues would you foresee with putting this application live as it is?

Obviously the data is incomplete. I haven't written any test and it looks quite ugly. It's also not complete so couldn't really be considered a MVP.

4. If this application was being built for one of our data-scientists, what are some of the questions you would you like to ask them to help you work out how to extend/improve the functionality of this app beyond its current functionality?

Not starting with a prototpye of what I was actually trying to build has definitely made this a more complicated and less useful project than it might have been.

So I would start with what is it they want to see. For example I could have chosen to create data on a given footballer by collating say all of Danny Roses statistics. I could have also looked for patterns in this data too.

So my questioning would be focused on why we want to see different elements and therefore where that data should be, how prominent, where on the page and so on.
