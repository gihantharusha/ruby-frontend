import React, { useEffect, useState } from "react";
import "./home.css";
import send from "../icons/send.png";
import axios from "axios";

const Home = () => {
  const [response, setResponse] = useState([]);
  const [input, setInput] = useState();
  const [h1, setH1] = useState();
  const [placeholder, setPlaceholder] = useState("enter your search key word");
  const [subinput, setSubinput] = useState();
  const [cl, setClass] = useState("invisible");
  const [keyword, setKeyword] = useState();
  const [addTodoTitle, setAddTodoTitle] = useState();
  const [addTodoDes, setAddTodoDes] = useState();
  const [addTodoDate, setAddTodoDate] = useState();
  const [class2, setClass2] = useState("invisible");

  useEffect(() => {
    axios.get(`https://ruby-server.onrender.com/getRememberMe`).then((res) => {
      setH1("Hello sir, you asked me to remind you");
      setResponse(res.data);
    });
  }, []);

  const clickButton = () => {
    setH1("");
    const simpleInput = " " + input.toLowerCase() + " ";
    console.log(simpleInput);

    const withoutSimble = simpleInput.replace(/[^a-zA-Z ]/g, "");
    const checkRemeber = withoutSimble.search(" remember ");
    const checkSearch = withoutSimble.search(" search ");
    const checkAddTodo = withoutSimble.search(" add todo ");
    const checkviewAllTodo = withoutSimble.search(" view all todo ")
    const checkViewTodo = withoutSimble.search(" view todo ")

    if (checkRemeber >= 0) {
      axios.post(`https://ruby-server.onrender.com/remember?data=${input}`);
      setResponse([{ data: " Ok sir i'll remember it" }]);
      setInput("");
    } else if (checkSearch >= 0) {
      setClass2("invisible")
      setClass("inputs");
      setH1("Sir enter your data on below input area");
      setResponse([]);
      setKeyword("search");
    } else if (checkAddTodo >= 0) {
      setClass("invisible")
      setClass2("todos");
      setH1("Sir enter your data on below input area");
      setResponse([]);
      setKeyword("add todo");
    }else if(checkviewAllTodo >= 0){
      setClass("invisible")
      setClass2("invisible")
      axios.get(`https://ruby-server.onrender.com/viewAllTodo`)
      .then(res=>{
        console.log(res)
        setResponse(res.data)
      })
    }else if(checkViewTodo >= 0){
      setClass("invisible")
      setClass2("invisible")
      axios.get(`https://ruby-server.onrender.com/viewTodo`)
      .then(res=>{
        console.log(res)
        setResponse(res.data)
      })
    }
  };

  const addSubmit = () => {
    if (keyword === "search") {
      const data = subinput;
      setClass("invisible");
      setH1("");
      setSubinput("");
      axios.get(`https://ruby-server.onrender.com/searchDate?data=${data}`).then((res) => {
        setResponse(res.data);
        setInput("");
      });
    }else if(keyword === "add todo"){
      setResponse([])
      axios.post(`https://ruby-server.onrender.com/addTodo?title=${addTodoTitle}&des=${addTodoDes}&date=${addTodoDate}`)
      setResponse([{data:'Ok sir, your todo is saved'}])
      setClass2("invisible")
      setAddTodoTitle("")
      setAddTodoDes("")
      setAddTodoDate("")
      setInput("")
      setH1("")
    }
  };

  return (
    <div>
      <div className="top">
        <h1>mr.Ruby</h1>
      </div>

      <div className="reply">
        <h1>{h1}</h1>
        <ul>
          {response?.map((e) => (
            <li>{e.data} {e.description}</li>
          ))}
        </ul>

        <div className={cl}>
          <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => {
              e.preventDefault();
              setSubinput(e.target.value);
            }}
          />
          <button onClick={addSubmit}>submit</button>
        </div>

        <div className={class2}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              e.preventDefault();
              setAddTodoTitle(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) => {
              e.preventDefault();
              setAddTodoDes(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Date"
            onChange={(e) => {
              e.preventDefault();
              setAddTodoDate(e.target.value);
            }}
          />
          <button onClick={addSubmit}>Submit</button>
        </div>
      </div>

      <div className="form">
        <textarea
          value={input}
          name=""
          id=""
          placeholder="Type your command"
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        ></textarea>
        <button onClick={clickButton}>
          <img src={send} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Home;
