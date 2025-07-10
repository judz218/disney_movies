import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Controls from "./components/Controls";

export default function App() {
  const [data, setData] = useState(null);

  const [xProperty, setXProperty] = useState("Release date");
  const [yProperty, setYProperty] = useState("");

  useEffect(() => {
    d3.csv("/walt_disney_movies.csv").then((data) => {
      setData(data);
    });
  }, []);

  if (!data) {
    return <p>Loading</p>;
  }

  console.log(data);
  return (
    <div>
      <Header />
      <Controls yProperty={yProperty} setYProperty={setYProperty} />
      <Main data={data} xProperty={xProperty} yProperty={yProperty} />
    </div>
  );
}
