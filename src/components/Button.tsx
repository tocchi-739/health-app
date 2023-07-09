interface props {
  text: string;
  handleClick: () => void;
}

export const Button = (props: props) => {
  const { text, handleClick } = props;
  return (
    <button
      onClick={handleClick}
      className="bg-cyan-900 text-white rounded hover:bg-white hover:border hover:border-cyan-900 hover:text-cyan-900 duration-200"
    >
      {text}
    </button>
  );
};
