# Silly Votes

A small, microservice-oriented project for running imaginary campaigns.

## Purpose

Primary this is a self-learning project to understand how to build a system via microservices.

In terms of technology stack, most of the project is NodeJS with Express and React.

## Inspirations

Some patterns in this project are actually inspired from features seen when trialing Microsft Azure Functions, of interest to me was the ability to query a CosmosDB and have those results passed in as their own parameter to the function.

In this self-exercise, Express middleware has be used to try and replicate that convenience.

## Services

This section lists the services created so far and which are still planned to be created (at the time of writing).

Technically, this is more a list of containers but given each container only has one service each, the term is being used interchangibly for now.

|Service|Description|Built?|
|:---|:---|:---:|
|be-auth-dev|Dummy service that simply creates a JWT token, nothing else|Y|
|be-campaigns|Oversees all access to campaigns stored in a mongo DB|Y|
|be-votes|Oversees all access to votes stored in a mongo DB|N|
|db-mongo|Holds the Mongo database|Y|
|fe-web-api|What passes for a reverse proxy and effective collates the API of all other services behind it|Y|
|fe-web-react|The actual front end that users via a browser see.  As the name implies, it is written in React.|Y|

## Authentication Notes

Admittedly, this requires ALOT of improvement.  At the time of writing, it simply allows a hassle free way of creating a JWT token with just a email address (which acts as the user identifier for the rest of the system).

In future, it maybe extended to actually require a email AND password but for now, it is there to simply provide a token the other microservices use for authentication purposes.
