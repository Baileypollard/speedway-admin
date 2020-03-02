# Looney Speedway Admin Web Panel

This web panel offers admins the ability to perform CRUD operations on contestants and races. Furthermore, admins have the ability to "activate" a race which will make it viewable from the mobile clients. Once the admin has started the race, positions will be mutable, meaning that they can be updated in real time by dragging and dropping them into their updated positions. The score keeper will be in charge of updating the positions manually which will then sync instantly to the client through Google's Cloud Firestore.

Using Redux for this application may have been a bit overkill, but thinking about the potential scalability issues that come with the context approach has made it my state management architecture of choice. 

