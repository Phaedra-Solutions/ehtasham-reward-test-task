# Retailer Rewards Program System

For every dollar spent over $50 on the transaction, the customer receives one point.
In addition, for every dollar spent over $100, the customer receives another point.
Ex: for a $120 purchase, the customer receives
(120 - 50) x 1 + (120 - 100) x 1 = 90 points

Given a record of every transaction during a three-month period, calculate the reward points
earned for each customer per month and total. 
* Make up a data set to best demonstrate your solution
* Check solution into GitHub

## How to setup the code on local machine

     Backend 

* Clone the repo into your local machine and run command `cd backend` on terminal.
* Hit the `npm install` command in the backend repo and after the installation of the packages run the script `npm run dev`.
* Now your backend server start listening on the port 5000 e.g `http://localhost:5000`
* Now client can get the the last 3 month rewards points with each customer per month and total by calling the API `http://localhost:5000/api/retailer/rewards`.

##

     Frontend 

* Run the command from the root of repo `cd frontend` and run `npm install` to install the project dependencies.
* Now run the script `npm start` to intailze the react frontend that demonstrate the data set in the table formats of customers list, transactions list, monthly total by customer and 3 month summary.
* Frontend hit the API `http://localhost:5000/api/retailer/rewards` to get the rewards points data for demonstrate


## Data Set and Results

- Customers List

    ![Customers List](/assets/Screenshot%202022-07-25%20at%204.45.46%20PM.png)

- Transactions List

    ![Customers List](/assets/Screenshot%202022-07-25%20at%204.50.47%20PM.png)

- Monthly total per
customer

   ![Customers List](/assets/Screenshot%202022-07-25%20at%204.53.34%20PM.png)

- Three Month Total

    ![Customers List](/assets/Screenshot%202022-07-25%20at%204.54.36%20PM.png)