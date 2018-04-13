# AgentDesks Matching Application

## Overview
AgentDesks is a real estate marketplace between buying agents and listing agents. This application hosts a single algorithm that matches agents' search queries with properties and alerts the buying & listing agents once a day.

## Assumptions
* Objective of the application is to outperform a naive implementation's run-time of O(*nm*) exhaustive comparison of *n* search queries with *m* properties with in-memory optimizations.
* Exact implementations of data structures are omitted for time constraints.
* Other than the database choice, the project considers further data infrastructure optimizations out-of-scope.
* This algorithm runs once a day and has the allowance of time & resources for pre-processing data.
* The data, application, and computing resources are hosted on industry-standard cloud solutions, namely AWS.
* Node.js, NPM/Yarn, AWS, and other environment setups are preconfigured.
* Computing is run on EC2 instance(s) with sufficient in resources to run this operation. Scaling and resource management is out-of-scope for this task.
* Data is stored in a relational database, namely PostgreSQL served on RDS. (Graph databases and other NoSQL solutions are not optimal for indexing and analyzing large data sets.)
* The application has pre-built, out-of-scope helper functions at its disposal (noted on each call).
* Although the scope of this algorithm and task are narrow, types and patterns should be structured to be forward-compatible, versioning models and erring on compositional (OOLO) rather than inheritance-based patterns.

## Process
1. Fetch all `Property` objects and structure the output into a data structure `PropertyStore`, optimized for in-memory lookup run-time.
* Fetch all `SearchQuery` objects from the db and map to statically-typed TypeScript interfaces.
* For each `SearchQuery`, find one or more matching `Property` objects in the lookup structure.
* Alert the matched agents via AWS SES.