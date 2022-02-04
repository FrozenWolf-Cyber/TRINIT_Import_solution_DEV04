# EmailedIn - The Ultimate LinkedIn Profile Finder

## Introduction
A LinkedIn profile is often the best way to get to know a person, without even talking to them. An ideal LinkedIn profile contains their educational qualifications, experience, projects they have worked on, contact info etc. A LinkedIn profile is very useful for recruiters who can get to know more about a candidate applying to a job/internship.

This repository is a submission part to the "DEV04" problem statement by the team "import_solution", for the [Tri-NIT Hackathon 2022](https://tri-nit-hackathon.github.io/).
The problem statement mentions to build an interface that can find a person’s LinkedIn profile using only their email ID. 

## Proposed Method
We are proposing to create a web application which can cater to all the requirements above. A web application is very useful, since it can be directly deployed to a PaaS infrastructure and accessed by any device (laptop, mobiles, tablets etc.) connected to the internet. The application proposed will interact with the [SignalHire API](https://www.signalhire.com/api), to find out the URL of a LinkedIn profile associated with the email ID entered by the user. This link can be copied by the user and pasted to any web broswer of their preference.

## Features/Work Done
* Created a web application using Flask.
* User can enter a Email ID for searching associated LinkedIn profile.
* The application can interact with SignalHire API - backbone for LinkedIn URL search.
* Application can dynamically update the progress of a search in a text-box.
* Handled error cases of "Profile not found" and "Credits over for the associated API key".
* User can directly copy with a single button, and paste the link to a web-browser of their preference.
* An optional Advanced Options menu is present, where a user can give their [own API Key](https://www.signalhire.com/apiIntegrations) instead.
* Bootstrap allows web app to be scaled to different screen sizes.
* Deployed entire application to Heroku.

## Check it out!
https://emailedin.herokuapp.com/

## Tech Stack
* Python
* Flask
* HTML
* CSS 
* JavaScript
* JQuery
* Bootstrap

## Screenshots

### *Home Page*
![home-page](/app_pics/home-page.png)

### *Main App Page*
![main-app-page](/app_pics/main-app-page.png)

## Demo video
https://drive.google.com/drive/folders/1DcpYq1942a54cjr_e8fC3RKEYaV2hnoF?usp=sharing

https://user-images.githubusercontent.com/57902078/151692244-665ed9dd-58f7-4167-9bb7-342738d0d222.mp4


## Conclusion
The EmailedIn web application for finding a URL of a LinkedIn profile using only an email-id has been successfully created.

We thank the organizers of Tri-NIT Hackathon 2022 for giving us this opportunity to showcase our skills.

## Useful Links
* [SignalHire API Documentation](https://www.signalhire.com/api)
* [SignalHire API Key Creation](https://www.signalhire.com/apiIntegrations)
