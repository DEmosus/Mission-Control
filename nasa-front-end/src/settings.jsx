const resources = {
  background: {
    small: "/img/background-small.jpg",
    medium: "/img/background-medium.jpg",
    large: "/img/background-large.jpg",
  },
  pattern: "/img/glow.png",
};

const sounds = {
  shared: {
    volume: 0.5,
  },
  players: {
    click: {
      src: ["/sound/click.mp3"],
      options: { oneAtATime: true },
    },
    typing: {
      src: ["/sound/typing.mp3"],
      options: { oneAtATime: true },
    },
    deploy: {
      src: ["/sound/deploy.mp3"],
      options: { oneAtATime: true },
    },
    success: {
      src: ["/sound/success.mp3"],
      options: { oneAtATime: true, volume: 0.2 },
    },
    abort: {
      src: ["/sound/abort.mp3"],
      options: { oneAtATime: true },
    },
    warning: {
      src: ["/sound/warning.mp3"],
      options: { oneAtATime: true },
    },
  }
};

const themeConfig = {
  color: {
    content: "#3f4d50", 
  },
  padding: 20, 
  responsive: {
    small: 600,
    medium: 800,
    large: 1200,
  },
  typography: {
    headerFontFamily: '"Titillium Web", "sans-serif"',
  },
};

export { resources, sounds, themeConfig };
