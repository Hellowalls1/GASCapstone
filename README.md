
# GAS Read Me

GAS is a full-stack application for Musicians to connect. They are able to organize their musical gear, share gear they have with others, and list items for sale.

## Technologies Used:

- Visual Studio Code
- Visual Studio
- Bootstrap/ReactStrap
- SQL Server
- Entity Framework Core
- Google Firebase
- React


## Usage

- Clone GASCAPSTONE repository down to your machine. 
 
- Access root of project from your workspace using command below:

  ```cd Gas-ServerSideCapstone```

- Run the server-side program using code below

  ``` start GAS-ServerSideCapstone.sln```

- Once inside of Visual Studio build the solution 
- use the following commands to access the client-side program:

  ```cd GAS-ServerSideCapstone```

  ```cd client/```

  ```cd gas-serversidecapstone/```

- Once inside of the client-side directory run the program using the command below:

   ```code . ```
- Once the solution opens inside of Visual Studio Code use the command below to view the program in your browser:
 
  ```npm start```

## Features:

### User can login to the app using:

    Username: tim@tim.com / erykah@erykah.com / john@john.com / eva@eva.com
 
    Password: user123 (for all test users)
- User will be presented with a homepage of a beautiful photo of a guitar shop
- User can select "My Gear" "Show" and "Sell" affordances from the menu

#### My Gear Page
- The "My Gear" page allows the USER to add a new item of gear by entering in required information. User can list whether or not an item is for sale by selecting "yes" or "no" (yes will result on the item also populating on the sell page and no will result on the show page). User will need to copy a image link url for the item to display an image successfully.
- The USER can delete an item.
- The USER can edit an item as they see fit

#### Show Page
- The "Show" page is a social feature that allows users to nerd out and view what different musical gear each other has. If an item is not listed as for sale it will be displayed here. You can long in as another user to test that this feature functions as it should. 

#### Sell Page
- The "Sell" page is multi-faceted. Here all items that are listed for sale will be displayed. The USER will be presented with affordances to mark the item as "Sold" or click the "Barter" button. If the USER has sold an item they can select sold and the item will be deleted from the page as well as their "My Gear" affordance. A USER is only able to do this to their own items and will not be provided the affordance to mark anyone else's music gear as sold.
- If the USER selects the "Barter" affordance, they will be taken to a new page. On this page they can communicate directly by adding comments. The USER will be able to communicate with other members of the community. They can navigate back by clicking the "Back to Sell Page" button where they can mark an item for sold if they come to an agreement or they can explore the rest of the application.

### To Do:
#### This is the intended MVP of GAS. There are some features I would like to add to this application including:

- Advanced filtering options of gear that is listed for sale
- A more advanced UI/UX messaging experience between users
- More advanced commenting options

### Reach Out:

##### If you are into GAS feel free to reach me here:

Email:  tgeorgedev@gmail.com

Github:  https://github.com/Hellowalls1 (give me a follow)
