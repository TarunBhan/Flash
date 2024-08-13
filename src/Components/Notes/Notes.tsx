import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../Store/NotesSlice";
const Notes = () => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos);

  const inputHanlder = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addNotes = () => {
    dispatch(addTodo(input));
  };

  return (
    <div>
      <input onChange={inputHanlder} />
      <div style={{ display: "flex", height: "100px", background: "black" }}>
        {todos.length > 0 && (
          <h1>
            {todos.map((item: any) => {
              return <h2 style={{ color: "white" }}>{item?.textValue}</h2>;
            })}
          </h1>
        )}
      </div>
      <button onClick={addNotes}>Add notes</button>
    </div>
  );
};
export default Notes;
