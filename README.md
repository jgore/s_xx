# s_xx
s_xx - pharmacy system mapper

ARCHITECTURE :

1) oauth-ms : microservice for logging and authorization 
2) pharmacy-ms : main micro service for front end app [ it connect with A_XX and C_XX outer app for informations ]

-) RABBIT-MQ - message broker [ request to outer apps are made through WEB SOCKET - ASYNC NECESSARY ]
-) MONGO DB - very fast scalable database for persisting data

-) REST FOR COMMUNICATION
-) DOCKER for DevOPS 
-) JEST for testing 
-) EXPRESS
