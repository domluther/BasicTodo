# ToDo - now with MVC

A simple Todo list app using Express, Mongo + EJS

<img width="490" alt="image" src="https://github.com/user-attachments/assets/e9eedc6a-fbbd-4db4-95fb-1479bbbe1d07">

**Link to project:** N/A

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express, MongoDB, EJS

I wanted to look at the MVC architecture so made a simple Todo with a Mongo backend. I then refactored it step by step to implement MVC. It was an interesting look at how refactoring the code like this can lead to code which is more readable and re-usable, however the large number of small bitty files can take some getting used to.

## Changes

Original

- Wrote the original version using a backend file that held most of the logic.

MVC

- Moved to MVC architecture
- Moved connectDB to separate file
- Created routes using express.router
- Refactored controller logic to separate controller files
- Used mongoose to implement ORM.

Later

- Moved from CommonJS to ESM to modernise the imports.

## Lessons Learned:

Refactoring to MVC made the code more reusable. This is less important for a small project like this, but good to become increasingly confident on so when I implement it on a larger project it feels natural. This hopefully means that I would feel more confident in starting a project directly in MVC rather than building and then refactoring.

As I added extra features, the MVC architecture meant I had a strong idea of where the change should go. It meant changes didn't impact on the readability of other parts of the code - something that can happen when concerns are less separated and a file gets overwhelming.

Moving to ESM was an interesting refactor. Given the size of the project, it didn't take a long time but as I used `type:modules` to set it up like that it meant it didn't run until every `const require` was swapped to an `import from` which made debugging slightly harder. The enforced strict mode also caught a couple of times when I'd used a variable without const/let - something that strict mode does not allow.

### Future ideas

- Try making multiple branches using different views eg handlebars & React. This would clearly prove one of the advantages of MVC - that the modularity makes it easier for developers to change parts of the stack as needed.
- Random highlighting is done client-side. This does not persist and does not feel like it fits the rest of the website. I am unsure if something should be added to the model as the 'random' pick feels more ephemeral and so I can argue why it does not need to be in the database and should not persist on a reload.
