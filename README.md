# Customers/orders API written in Typescript

## Running locally

If you have node and yarn/npm installed globally, run ```yarn``` (or ```npm install```) to install all dependencies. Default port is set to 3000, you can change that in ```app.ts``` file or by setting an environment variable.
If you dont have node installed globally, I used ```asdf``` as my node version manager. [Install asdf](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf) first then run:

```
asdf plugin add nodejs
asdf install
```
inside root directory and you should be good to go. Version of node used by the app is specified in .tool-versions file.

To start the app, run ```yarn start```. 
To make requests to the server, you can use ```curl```, Postman or ```http``` if you have it installed. Currently the following endpoints are implemented:

```sh

http get :8080    # OK

http get :8080/customers    # List of all customers

http get :8080/customers/:id    # Returns customer whose id is :id

http post :8080/customers   # Api returns an error with a message about required fields missing from payload

http post :8080/customers email=harry@hogwarts.com givenName=Harry familyName=Potter  # 201 Creates and returns new customer

http get :8080/customers/:id/orders  # Returns a list of orders for a given customer

http get :8080/customers/:customerId/orders/:orderId  # Returns order with :orderId for a customer with :customerId

http post :8080/orders  # Api returns an error with a message about required fields missing from payload

http post :8080/orders  customerId=id # Returns and creates new order for provided customerId
```

All ids are matched on uuid type, so you need to pass correct values. To get these you can run dev db locally with ```yarn db``` or just use endpoints.

## TODO

A lot. Model tests are missing, service tests for orders are missing. Factory could be used instead of sequelize methods to insert data, or even better, a mock. DB is missing constraints, e.g it would be more reliable to add unique constraint on email and catch db errors rather than querying for email to check existence of a customer before inserting a new one. Services could do with better logging, ```GET /customers``` could do with pagination.