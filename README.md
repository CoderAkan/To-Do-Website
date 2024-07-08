# Full-Stack To-Do website 

## A fully functional To-Do project written in TypeScript, also in NestJS framework and React library

This to-do project is designed to help people create their to-do lists and check them after completing them. Also for each task the user can assign a particular category. 

# How to install it and use it

1. Make sure to install node js, in order to be able to use npm commands
2. Open a terminal and go to the /To-Do/server folder and run this command - sudo npm run start:dev
3. Simultaneously open a second terminal and go to the /To-Do/client folder and run this command - npm run dev
4. Then open a url file, it will be like this - http://localhost:5173/
5. For users that use it for the first time will need to sign up and password should be at least 6 symbols
6. After signing up the user should sign in
7. In the Home page will be displayed all to-dos and to add to-do user should go to the tasks page
8. If they didn't create categories then they should create it ("It's a better to create a category with manage categories button or in categories page")
9. In order to create a to-do the user should write title, description, choose a category and due date, then click the button create.
10. After that will be seen a notifier that will show that task was displayed. To see the created task go to the home page
11. In the home page, there is a pagination element that will have 5 tasks per page.
12. User can change/update the task by clicking the pen icon, then there will appear a new task form, where user should write necessary data ("If the user doesn't want to change a title, then he or she will have to rewrite the previous title and it applies for others as well")
13. User can delete a to-do by clicking the trash icon
14. After clicking pen and trash icons, the user will be redirected to the tasks page and after coming back to the home page the user will see a change
15. To check the task the user should click 3 times at checkbox icon and refresh the page
16. To uncheck the task the user should click 1 time at checkbox icon and then refresh the page
17. In the nav bar alongside the links to the home, tasks and categories pages there is a log out button upon clicking it the user will be logged out
