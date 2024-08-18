# ToDo - now with MVC

A simple Todo list app using Express, Mongo + EJS

<img width="490" alt="image" src="https://github.com/user-attachments/assets/e9eedc6a-fbbd-4db4-95fb-1479bbbe1d07">

**Link to project:** N/A

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Express, MongoDB, EJS

- v1 - Wrote the original version using a backend file that held most of the logic.
- v2 - Moved to MVC architecture
  - Moved connectDB to separate file
  - Created routes using express.router
  - Refactored controller logic to separate controller files

I wanted to look at the MVC architecture so made a simple Todo with a Mongo backend. I then refactored it step by step to implement MVC. It was an interesting look at how refactoring the code like this can lead to code which is more readable and re-usable, however the large number of small bitty files can take some getting used to.

## Lessons Learned:

Refactoring to MVC made the code more reusable. This is less important for a small project like this, but good to become increasingly confident on so when I implement it on a larger project it feels natural. This hopefully means that I would feel more confident in starting a project directly in MVC rather than building and then refactoring.

### Future ideas

- Try making multiple branches using different views eg handlebars & React. This would clearly prove one of the advantages of MVC - that the modularity makes it easier for developers to change parts of the stack as needed.
