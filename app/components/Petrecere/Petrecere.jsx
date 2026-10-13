import SliderScena from "../SliderScena/SliderScena";

export default function Petrecere() {
  return (
    <SliderScena
      id="petrecere"
      crowd="guests"
      label="Participanți"
      title={
        <>
          Câți oameni vin la <span>evenimentul tău</span>?
        </>
      }
    />
  );
}
