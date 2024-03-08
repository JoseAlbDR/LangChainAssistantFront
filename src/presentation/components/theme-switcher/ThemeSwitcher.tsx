import useDarkMode from 'use-dark-mode';

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false);

  return (
    <div className="flex gap-3">
      <button onClick={darkMode.disable}>
        <i className="fa fa-sun"></i>
      </button>
      <button onClick={darkMode.enable}>
        <i className="fa fa-moon"></i>
      </button>
    </div>
  );
};
