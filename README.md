# ![MovDB](Documentation/head.png)
# MovDB - A movie database


The web application MovDB provides users with information on over 2000 movies!
First, users can search for their desired movies using keywords from titles and description. Then they can click on the movies
that show up in the search results. This opens a popup, where the user can watch the trailer of the movie, see what companies
made it, what country it was made in and the its runtime. If the user has registered and is logged in, it can favorite the
the movies they like. The total of users that like the movie is shown beside the like button. 
If the user is not looking for a specific movie, it can use the app's filters and sorting to find movies to their liking.
Sorting can be done with regards to rating, runtime, title and release date, while the filters can find movies with 
specific genres, production countries, release date and runtime.

### Built With

* [React](https://reactjs.org/)
* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [GraphQL](https://graphql.org/)
* [MongoDB](https://www.mongodb.com/)
* [Material-UI](https://material-ui.com/)

## Downloading

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The following needs to be installed.

- [Node.js and npm](https://nodejs.org/en/download/)
- [VPN](https://innsida.ntnu.no/wiki/-/wiki/Norsk/Installere+VPN) or a direct connection to the NTNU network.

You may need to restart your computer after installing these.

### Installing

#### Step 1 - clone project: 
Open a terminal window, and navigate to you folder of choice. Clone the [repository](https://gitlab.stud.idi.ntnu.no/it2810-h20/team-23/prosjekt-3) by typing: 

```
git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-23/prosjekt-3.git
```
Do not navigate to the project folder just yet.

#### Step 2 - Connect to NTNU's network: 
Connect to NTNUs network either directly or through a VPN. 

#### Step 3 - Install and run the backend: 
Now we're ready to install dependencies. 
1. Open up your terminal
2. While in the project's root folder, navigate to the backend folder: 
    ``` 
    ...\prosjekt-3\movdb_backend 
    ```
2. Install the backend dependencies using: 
    ```
    ...\prosjekt-3\movdb_backend npm install
    ```
3. Start the backend using: 
    ``` 
    ...\prosjekt-3\movdb_backend node index.js
    ```

#### Step 4 - Install and run frontend:
1. Open another terminal (keep the previous one open)
2. While in the project's root folder, navigate to the frontend folder: 
    ``` 
    ...\prosjekt-3\movdb_frontend 
    ```
3. Install the frontend dependencies using: 
    ``` 
    ...\prosjekt-3\movdb_frontend npm install
    ```
4. Start the frontend using: 
    ``` 
    ...\prosjekt-3\movdb_frontend npm start
    ```

#### Step 5 - Start using the application:
Open up your favorite web browser and go to [localhost:3000](localhost:3000).
If the app is done compiling, you should be greeted with the MovDB frontpage.

To stop the server, go to the terminal where it is running, and press "ctrl + C" on windows, or "cmd + C" on mac.

## Testing

To run the project's tests, you can try typing:

```
npm run test
```
