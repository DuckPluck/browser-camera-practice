const THEME_CLASS_PREFIX = 'page_theme_';

type Theme = 'dark' | null;

const switchTheme = (themeName: Theme) => {
  const { classList } = document.documentElement;

  classList.forEach((className) => {
    if (className.startsWith(THEME_CLASS_PREFIX)) {
      classList.remove(className);
    }
  });

  if (themeName) {
    classList.add(`${THEME_CLASS_PREFIX}${themeName}`);
  }
};

export default switchTheme;
