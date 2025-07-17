const preview = document.getElementById('video-preview');

    const startPoints = [0, 6.5, 10.4, 14.45, 27.4, 31.3, 39.5, 43.05];

    preview.addEventListener('loadedmetadata', () => {
      const randomIndex = Math.floor(Math.random() * startPoints.length);
      const chosenTime = startPoints[randomIndex];

      if (chosenTime < preview.duration) {
        preview.currentTime = chosenTime;
      } else {
        preview.currentTime = 0;
      }
    });