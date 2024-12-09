# Where's Waldo Game

This project is a photo-tagging game inspired by the popular "Where's Waldo" series. It demonstrates my skills in frontend and backend integration, as well as creating interactive user experiences in web applications. The **client** and **API** for this game are both stored in the same repository.

## Overview

### The Challenge
- Users should be able to:
  - Select a character from a dropdown menu that appears when they click a location on the image.
  - Verify their selection by checking against the database, which validates whether the clicked coordinates match the correct character's location.
  - Receive feedback on every selection attempt.
  - Play through **3 levels** with increasing difficulty.
  - View their **score** and compare it on the **leaderboard**.
  - Track their performance using a **timer**.

## Screenshot

![App Screenshot](./screenshot.jpg)

## Links
- GitHub Repository: https://github.com/MikeBoguszewski/wheres-waldo
- Live Demo: https://wheres-waldo-8za6.onrender.com/

---

# My Process

## Built With
- **React** - For creating the interactive and dynamic user interface.
- **MongoDB** - Used to store the coordinates of the characters and handle verification of user selections.
- **Node.js** and **Express** - Backend setup to manage API requests and responses. The **client** and **API** are both within the same repository.

## What I Learned
This project taught me:
- How to use **MongoDB** to manage and query spatial data for the game.
- Building backend APIs with **Node.js** and integrating them with a frontend.
- Handling user interactions and creating a responsive experience using **React**.

**Example code snippet(timer interval):**
```js
useEffect(() => {
      let interval;

      if (!win) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10);
        }, 10);
      }
      return () => {
        clearInterval(interval);
      };
    }, [win, time]);
}
