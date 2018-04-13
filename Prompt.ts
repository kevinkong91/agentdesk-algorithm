/*

Agentdesks is a real estate marketplace between buying agents and listing agents.  

Listing agents post all their properties to our application.  
Example for a property: 
315 Montgomery Street, San Francisco, CA  
2 bed, 2 bath
Apartment
$1,200,000 (estimated price)


Buying agents post all their buyers' search criteria.  
Example for a search criteria:
$1.4 Million (budget)
2 bed/2 bath (preferred beds/baths)
Apartment, Condos, townhouse
Financial District, South of Market, Mission Bay (neighborhoods preferred in San Francisco)

All our agents are both buying agents and listing agents because they represent buyers and sellers.  
Each agent can have multiple properties and multiple search criteria which they upload to our application.  

Write an algorithm/script (in your preferred language and preferred database), which runs once everyday,
that finds all the  matching property listings for all the search criteria posted in the last 24 hours. 
Once a match is found, trigger an email to both agents for whom there were matches stating "We've found a match".  
Keep in mind that we have millions of properties in our database.  So, the code should avoid parsing
all property listings in depth because then it will take a lot of time to find matches for every search criteria.        

What we are looking for:
- Quality of code
- Speed (or any thoughts on recommendations to make it faster)
- Structure

*/