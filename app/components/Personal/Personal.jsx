import SliderScena from "../SliderScena/SliderScena";

export default function Personal() {
  return (
    <SliderScena
      id="personal"
      crowd="staff"
      label="Personal"
      title={
        <>
          De câți oameni <span>ai nevoie</span> pentru evenimentul tău?
        </>
      }
    />
  );
}
