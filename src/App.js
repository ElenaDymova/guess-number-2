import React, { useState, useRef } from "react";
import './App.css';

function App() {
  //генерация случайного числа
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 101);
  }

  const [gameState, setGameState] = useState({
    name: '',
    randomNumber: getRandomNumber(),
    messages: [],
    attempts: 0,
    won: false
  });

  console.log("Случайное число:", gameState.randomNumber);
  
  // Ссылка на инпут для очистки
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!gameState.name) {
      setGameState((prev) => ({
        ...prev,
        name: e.target.elements.username.value,
      }));
    } else {
      const guess = e.target.elements.guess.value;
      //увеличиваем попытки
      setGameState((prev) => ({
        ...prev,
        attempts: prev.attempts + 1,
      }));

      let newMessage = '';

      if (guess < gameState.randomNumber) {
        newMessage = "⬆️️ Few. Try again 😸";
      } else if (guess > gameState.randomNumber) {
        newMessage = "⬇️ Many. Try again 😸";
      } else {
        newMessage = `Right! 🎉 You've guessed the number: ${gameState.randomNumber}`;
        setGameState((prev) => ({
          ...prev,
          won: true,
        }));
      }

      // добавляем новое сообщение и введенное число в массив
      setGameState((prev) => ({
        ...prev,
        messages: [...prev.messages, { number: guess, message: newMessage }],
      }));
    }
    //очищаем инпут
    inputRef.current.value = "";
  }

  return (
    <div className="App">
      <h1>🎲 Guess Number</h1>
      {gameState.name && <p>😄 <b>{gameState.name}</b>, there is a number between 0 and 100. Try to guess it in the
            fewest number of tries. After
            each attempt, there will be a message with the text - 'Few', 'Many' or 'Right'.'
      </p>}

      <div className="messages">
        {gameState.messages.map((item, index) => (
          <div key={index}>
            <p>➡️ {item.number}</p> 
            <p className="message">{item.message}</p> 
          </div>
        ))}
      </div>
      {gameState.won && <p>🎉 Number of attempts: {gameState.attempts}</p>}



      {!gameState.won &&       
        <form onSubmit={handleSubmit}>
          <input
            type={`${!gameState.name ? 'text' : 'number'}`}
            name={`${!gameState.name ? 'username' : 'guess'}`}
            placeholder={`${!gameState.name ? '👋 Enter your name' : 'Enter number'}`}
            ref={inputRef}
            min='1'
            max='100'
          />
        </form>
      }
    </div>
  );
}

export default App;




//первый вариант решения, когда создано много разных состояний
// import React, { useState, useRef } from "react";
// import './App.css';

// function App() {
//   //генерация случайного числа
//   const getRandomNumber = () => {
//     return Math.floor(Math.random() * 101);
//   }

//   //состояние для хранения имени
//   const [name, setName] = useState('');
//   //состояние для хранения случайного числа
//   const [randomNumber, setRandomNumber] = useState(() => getRandomNumber());
//   console.log("Случайное число:", randomNumber);
//   //состояние для списка сообщений
//   const [messages, setMessages] = useState([]);
//   // Ссылка на инпут для очистки
//   const inputRef = useRef(null);
//    // состояние для количества попыток
//    const [attempts, setAttempts] = useState(0);
//    // состояние для отслеживания победы
//    const [won, setWon] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name) {
//       setName(e.target.elements.username.value);
//     } else {
//       const guess = e.target.elements.guess.value;
//       //увеличиваем попытки
//       setAttempts((prevAttempts) => prevAttempts + 1);
//       let newMessage = '';

//       if (guess < randomNumber) {
//         newMessage = "⬆️️ Few. Try again 😸";
//       } else if (guess > randomNumber) {
//         newMessage = "⬇️ Many. Try again 😸";
//       } else {
//         newMessage = `Right! 🎉 You've guessed the number: ${randomNumber}`;
//         setWon(true);
//       }

//       // добавляем новое сообщение и введенное число в массив
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { number: guess, message: newMessage, attempts: attempts }
//       ]);
//     }
//     //очищаем инпут
//     inputRef.current.value = "";
//   }

//   return (
//     <div className="App">
//       <h1>🎲 Guess Number</h1>
//       {name && <p>😄 <b>{name}</b>, there is a number between 0 and 100. Try to guess it in the
//             fewest number of tries. After
//             each attempt, there will be a message with the text - 'Few', 'Many' or 'Right'.'
//       </p>}

//       <div className="messages">
//         {messages.map((item, index) => (
//           <div key={index}>
//             <p>➡️ {item.number}</p> 
//             <p className="message">{item.message}</p> 
//           </div>
//         ))}
//       </div>
//       {won && <p>🎉 Number of attempts: {attempts}</p>}

//       {!won &&       
//         <form onSubmit={handleSubmit}>
//           <input
//             type={`${!name ? 'text' : 'number'}`}
//             name={`${!name ? 'username' : 'guess'}`}
//             placeholder={`${!name ? '👋 Enter your name' : 'Enter number'}`}
//             ref={inputRef}
//           />
//         </form>
//       }
//     </div>
//   );
// }

// export default App;