
# Transaction Dashboard

This is a ReactJS + Typescript project created solely for Paymennt's recruitment assessment.


## Run Locally


Go to the project directory

Install dependencies

```bash
  npm install
```

Run the website

```bash
  npm start
```

## Author's Notes
In order to Sign In to the dashboard, use the following credentials:
- Email: amr@gmail.com
- Password: Password1

If you wish to use another email or password, feel free to go to the users.txt file present in the public folder of the project and replace the credentials. This is required as my implementation is reading users from a text file as one would read from a live database. Be sure to correctly add an email and a password seperated by a space.

## Work Done
In accordance with the provided document, I have completed the following tasks:
- Used correct data structures, as required.
- Displayed 1000 records in the homepage, grouped by the Transaction Time Stamp. Here I made the following assumptions:
    - I grouped the transacition by date.
    - I did not use reactQuery to cache the json response, nor did I use performcance enhancing useMemo hook to store the data in my component's state. This was intentionally left out as reading json data from a file does not pose any performance threats compared to fetching 1000's of records via api calls from a server.
    - Furthermore, given the "Buttery smooth scrolling" statement in the document, I assumed that the requirement is to display a scrollable list of 1000 records, rather than a paginated table which, for obvious reasons, would have been the go to approach had this been a live server data fetching scenario.
    - As per the instructions, I was free to play around with the UI so I went for something minimal as to not distract the user who will be visiting a data-intensive dashboard.