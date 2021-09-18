import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [value, setValue] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((emp) => {
        setUser(emp);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (index) => {
    setValue(index);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  const { title, company, dates, duties } = user[value];
  return (
    <main>
      <h1>Experience</h1>
      <div className='container'>
        <section className='company'>
          {user.map((items, index) => {
            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`btn ${value === index ? "active-btn" : false}`}
              >
                {items.company}
              </button>
            );
          })}
        </section>
        <section className='user'>
          <div>
            <h2>{title}</h2>
            <p className='p-company'>{company}</p>
            <p className='p-dates'>{dates}</p>
            {duties.map((item) => {
              return (
                <p className='info'>
                  <FaAngleDoubleRight /> {item}
                </p>
              );
            })}
          </div>

          <button className='moreInfo'>More Info</button>
        </section>
      </div>
    </main>
  );
}

export default App;
