# Project: Course Selection — MVC (HTML + CSS + JS)

A small, clean project: two buckets (Available / Selected), simple styling, and a JSON Server backend.  
Everything is plain HTML, external CSS, and JavaScript organized in an MVC-ish way (Api → View → Model → Controller).

## What’s inside
- **Feature A**: Two buckets with identical styling. Click a course to toggle selection (deepskyblue).
- **Feature B**: Live **Total Credit** counter at the bottom. Selecting adds credits, unselecting removes. Prevents going over **18** with an alert.
- **Feature C**: **Select** button. On click:
  1) (ADDITION) Checks you’ve selected enough **Compulsory** courses.  
     **New rule**: there are **8 compulsory courses** overall—users must select **at least 4** before they can submit.
  2) Shows a confirmation (“You have chosen X credits…”).  
  3) If confirmed, moves the chosen items to the **Selected Courses** bucket and disables the button (no more edits).

### Clone and Run JSON Server
This project uses [json-server](https://github.com/Show3567/json-server) to serve course data.
```bash
git clone https://github.com/Show3567/json-server.git
cd json-server
npm install
npm start
