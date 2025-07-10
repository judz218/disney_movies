export default function Controls({ yProperty, setYproperty }) {
  const propertyName = ["IMDb"];
  return (
    <div>
        yProperty
      <select
        value={yProperty}
        onChange={(event) => {
          setYProperty(event.target.value);
        }}
      >
        {propertyName.map((p, i) => (
          <option key={i} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
