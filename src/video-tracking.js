var nonAutoplayVideos = document.querySelectorAll("video:not([autoplay])");

nonAutoplayVideos.forEach(function (video) {
  function pushDataLayerEvent(eventType) {
    dataLayer.push({
      event: eventType,
      video_title: video.currentSrc,
      video_current_time: video.currentTime,
      video_duration: video.duration,
      video_percent: (video.currentTime / video.duration) * 100,
      video_url: video.url
    });
  }

  video.addEventListener("play", function () {
    pushDataLayerEvent("html_video_play");
  });

  video.addEventListener("pause", function () {
    pushDataLayerEvent("html_video_pause");
  });

  video.addEventListener("ended", function () {
    pushDataLayerEvent("html_video_end");
  });

  video.addEventListener("timeupdate", function () {
    if (video.currentTime > 10 && !video._tenSecReported) {
      pushDataLayerEvent("html_video_10_seconds");
      video._tenSecReported = true;
    }
  });

  // Example of capturing percentage played
  video.addEventListener("timeupdate", function () {
    var percentPlayed = (video.currentTime / video.duration) * 100;
    if (!video._quarterReported && percentPlayed >= 25) {
      pushDataLayerEvent("html_video_25_percent");
      video._quarterReported = true;
    }
    if (!video._halfReported && percentPlayed >= 50) {
      pushDataLayerEvent("html_video_50_percent");
      video._halfReported = true;
    }
    if (!video._threeQuarterReported && percentPlayed >= 75) {
      pushDataLayerEvent("html_video_75_percent");
      video._threeQuarterReported = true;
    }
  });
});
