import useDarkMode from 'use-dark-mode';

export const ThemeSwitcher = () => {
  const darkMode = useDarkMode(false);

  const toggleDarkMode = () => {
    darkMode.toggle();
  };

  return (
    <>
      <button onClick={toggleDarkMode}>
        {darkMode.value ? (
          <i className="fa fa-moon text-3xl"></i>
        ) : (
          <i className="fa fa-sun text-3xl"></i>
        )}
      </button>
    </>
  );
};
