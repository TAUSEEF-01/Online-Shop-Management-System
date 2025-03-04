interface TitleProps {
  text1: string;
  text2: string;
}

const Title = ({ text1, text2 }: TitleProps) => {
  return (
    <h1 className="text-3xl font-bold">
      {text1} <span>{text2}</span>
    </h1>
  );
};

export default Title;
