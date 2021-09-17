import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
const url = "https://course-api.com/react-tabs-project";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [btnSelected, setBtnSelected] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((emp) => {
        setUser(emp);
        setIsLoading(false);
        setSelectedUser(emp[0]);
        setBtnSelected(emp[0].id);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (id) => {
    setSelectedUser(() => {
      const newUser = user.filter((e) => e.id === id);
      return newUser[0];
    });
    setBtnSelected(id);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <h1>Experience</h1>
      <div className='container'>
        <section className='company'>
          {user.map((items) => {
            return (
              <button
                onClick={() => handleClick(items.id)}
                className={`btn ${
                  btnSelected === items.id ? "active-btn" : false
                }`}
              >
                {items.company}
              </button>
            );
          })}
        </section>
        <section className='user'>
          <div>
            <h2>{selectedUser.title}</h2>
            <p className='p-company'>{selectedUser.company}</p>
            <p className='p-dates'>{selectedUser.dates}</p>
            {selectedUser.duties ? (
              selectedUser.duties.map((item) => {
                return (
                  <p className='info'>
                    <FaAngleDoubleRight /> {item}
                  </p>
                );
              })
            ) : (
              <div></div>
            )}
          </div>

          <button className='moreInfo'>More Info</button>
        </section>
      </div>
    </main>
  );
}

export default App;
