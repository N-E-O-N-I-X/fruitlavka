const video = document.getElementById('video');

    const startPoints = [0, 6.5, 10.4, 14.45, 27.4, 31.3, 39.5, 43.05];

    video.addEventListener('loadedmetadata', () => {
      const randomIndex = Math.floor(Math.random() * startPoints.length);
      const chosenTime = startPoints[randomIndex];

      if (chosenTime < video.duration) {
        video.currentTime = chosenTime;
      } else {
        video.currentTime = 0;
      }
    });