const video = document.getElementById('video');

    // Массив стартовых точек (в секундах)
    const startPoints = [0, 6.5, 10.4, 14.45, 27.4, 31.3, 39.5, 43.05];

    // Ждём, пока видео загрузит метаданные (в т.ч. duration)
    video.addEventListener('loadedmetadata', () => {
      const randomIndex = Math.floor(Math.random() * startPoints.length);
      const chosenTime = startPoints[randomIndex];

      // Если стартовая точка больше длительности видео — начнёт с 0
      if (chosenTime < video.duration) {
        video.currentTime = chosenTime;
      } else {
        video.currentTime = 0;
      }
    });