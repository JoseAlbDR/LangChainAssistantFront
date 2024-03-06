const Icon = ({ type }: { type: string }) => {
  return (
    <span
      className={`fa-solid fa-${type} text-2xl text-default-400 pointer-events-none flex-shrink-0`}
    />
  );
};

export default Icon;
