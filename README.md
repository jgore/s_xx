# s_xx
s_xx - pharmacy system mapper

ARCHITECTURE :

1) oauth-ms : microservice for logging and authorization 
2) pharmacy-ms : mainmicro service for frontend app [ it connects with A_XX and C_XX outer app for informations ]

-) RABBIT-MQ - message broker [ request to outer apps are made through WEB SOCKET - ASYNC NECESSARY ]
-) MONGO DB - very fast scalable database for persisting data

-) REST FOR COMMUNICATION
-) DOCKER for DevOPS 
-) EXPRESS as node framework

TESTING

-) JEST for testing 
-) in memory mongo db
-) embedded rabbitMQ 

