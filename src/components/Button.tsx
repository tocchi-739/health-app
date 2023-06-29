import styles from "../../styles/Home.module.css";

interface props {
  text: string;
  handleClick: () => void;
}

export const Button = (props: props) => {
  const { text, handleClick } = props;
  return <button onClick={handleClick}>{text}</button>;
};
