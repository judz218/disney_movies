export default function Controls({ yProperty, setYproperty }) {
  const propertyName = ["IMDb"];
  const propertyVal = ["imdb_score"];
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
          <option key={i} value={propertyVal[i]}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
