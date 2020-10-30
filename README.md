# MovDB - A movie database

The web application MovDB provides users with information on over 2000 movies!
First, users can search for their desired movies using keywords from titles and description. Then they can click on the movies
that show up in the search results. This opens a popup, where the user can watch the trailer of the movie, see what companies
made it, what country it was made in and the its runtime. If the user has registered and is logged in, it can favorite the
the movies they like. The total of users that like the movie is shown beside the like button. 
If the user is not looking for a specific movie, it can use the app's filters and sorting to find movies to their liking.
Sorting can be done with regards to rating, runtime, title and release date, while the filters can find movies with 
specific genres, production countries, release date and runtime.

## Built With

* [Material-UI](https://material-ui.com/)
* [React](https://reactjs.org/)
* 

# Downloading

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

The following needs to be installed.

- [git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org/en/download/)
- [Python](https://www.python.org/downloads/) - Version 3.7.\* or 3.8.\*

You may need to restart your computer after installing these.

## Installing

### Step 1 - clone project: 
Open a terminal window, and navigate to you folder of choice. Clone the [repository](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/39) by typing: 

```
git clone https://gitlab.stud.idi.ntnu.no/tdt4140-2020/39.git
```
Do not navigate to the project folder just yet.

### Step 2 - create virtual environment (optional but recomended): 
Now we will create a new Python virtual environment for the project. This ensures you don't mess up your root Python installation, and keeps everything cleaner. 
If you need convincing of why you shhpuld use a virtual environment, you can read [here](https://realpython.com/python-virtual-environments-a-primer/#why-the-need-for-virtual-environments). 
You can use what virtual environment manager you like, but we will usue the [`venv`](https://docs.python.org/3.7/library/venv.html#) module that is included in the Python standard library.

When using `venv` you can install the environment wherever you'd like, but it's simple to just use the folder where we downloaded the project. 
Now we make the virtual environment. You can give it a name of your own choosing, just replace "myvenv" with your choice.

On Mac/Linux:

```
python3 -m venv myvenv
```
If you do not have pip3 or the virtual environment installed, this can be done by running the commands:
```
sudo apt-get install python3-pip
```
```
sudo apt-get install python3-venv
```

On Windows:

```
py -m venv myvenv
```

That sets up the virtual environment, and now we have to activate it. Again, if you chose another name, just replace "myvenv" with your replacement.

On Mac/Linux:

```
source myvenv/bin/activate
```

On Windows:

```
myvenv\scripts\activate
```

### Step 3 - install dependencies:
Now we're ready to install dependencies. 

First we make shure `pip` is updated. 
Since we're in a virtual environment now, we can just use the "python" command instead of "python3" or "py".

```
python -m pip install --upgrade pip
```

We navigate to our project folder:

```
cd 39
```

And install the required python packages:

```
pip install -r requirements.txt
```
If this give an error you can try installing it manually on Linux by running:
```
pip3 install Django
pip3 install djangorestframework
pip install django-rest-knox
```

We also need to install the npm dependencies.

```ruby
npm install #this one takes a while
```
If you get a message that says: 
"found 14 low severity vulnerabilities
 run `npm audit fix` to fix them, or `npm audit` for details"
 then run 'npm' audit fix'
 
 
 
 

### Step 4 - database:

Get the database ready by running:

```
python manage.py migrate
```

if you get an error saying:
"CommandError: Conflicting migrations detected; multiple leaf nodes in the migration graph: (0004_auto_20200402_1118, 0007_auto_20200417_1442 in bookings).
To fix them run 'python manage.py makemigrations --merge' "
then run

```
python manage.py makemigrations --merge
```

after this you will get a message saying:
"Do you want to merge these migration branches? [y/N]"
run 'y'
then once again run:
```
python manage.py migrate
```
### Step 5 - fire it up:

Now we just have to start the server:

```
python manage.py runserver
```

Open up your favorite web browser and go to [localhost:8000](localhost:8000), and it should be up an running.

To stop the server just go to the terminal where the surver is running, and press "ctrl + C" on windows, or "cmd + C" on mac.


found 14 low severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
  
  





# Testing

Currently there are no automated tests in the project, but there is example-data you can use. 
You can switch out the database by exchanging "db.sqlite3" in the "39" folder with the one in "39/test".

You should now be able to see multiple rooms when you press "book rooms". 

There are also pre-made users in all currently available categories:

* Customer - email: "customer@gmail.com" - password: "customer"
* Manager - email: "admin" - password: "admin"

# Wiki

More info on how to use the site, documentation, product roadmap and routines for evolution can be found in the [wiki](https://gitlab.stud.idi.ntnu.no/tdt4140-2020/39/-/wikis/home). 