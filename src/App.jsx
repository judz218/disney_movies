import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        d3.csv("/walt_disney_movies.csv").then((data) => {
            console.log(data);
        });
        
    }, []);
    
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}