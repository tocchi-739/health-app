import styles from "../../styles/Home.module.css";

interface props {
  text: string;
  handleClick: () => void;
}

export const Button = (props: props) => {
  const { text, handleClick } = props;
  return (
    <button
      onClick={handleClick}
      className="bg-gray-200 rounded hover:bg-gray-500 hover:text-white duration-200"
    >
      {text}
    </button>
  );
};
