# AgentDesks Matching Application

## Overview
AgentDesks is a real estate marketplace between buying agents and listing agents. This application hosts a single algorithm that matches agents' search queries with properties and alerts the buying & listing agents once a day.

## Assumptions
* The data, application, and computing resources are hosted on industry-standard cloud solutions, namely AWS.
* Node.js, NPM/Yarn, AWS, and other environment setups are preconfigured.
* Computing is run on EC2 instance(s) with sufficient in resources to run this operation. Scaling and resource management is out-of-scope for this task.
* Data is stored in a relational database, namely PostgreSQL served on RDS. (Graph databases and other NoSQL solutions are not optimal for indexing and analyzing large data sets.)
* The application has at its disposal pre-built helper functions (noted on each call).
* Objective of the application is to outperform a naive implementation's run-time of O(*nm*) exhaustive comparison of *n* search queries with *m* properties.
* This algorithm runs once a day and has the allowance of time & resources to pre-structuring raw output of Property objects for optimized run-time lookups.
* Although the scope of this algorithm and task are narrow, types and patterns should be structured to be forward-compatible, versioning models and erring on compositional (OOLO) rather than inheritance-based patterns.

## Process
