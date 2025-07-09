import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { GrEdit } from "react-icons/gr";
import { RiDeleteBinFill } from "react-icons/ri";
import './App.css'
import { Navbar } from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid'; // Importing uuidv4 for unique IDs
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


function App() {
  // const [count, setCount] = useState(0)
  const [todo, setTodo] = useState('');
  const [desc, setdesc] = useState('');
  const [todos, setTodos] = useState(() => {
    // Load from localStorage on component mount
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });


  const [showPastTasks, setShowPastTasks] = useState(false);

  const filteredTodos = todos.filter(item => showPastTasks ? item.isCompleted : !item.isCompleted);



  const handleEdit = (e, id) => {
    // Logic for editing a task
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo);
    setdesc(t[0].desc);
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);

  }

  const handleDelete = (e, id) => {
    // Logic for deleting a task
    let index = todos.findIndex(item => {
      return item.id === id
    });
    console.log(`The index is ${index}`);
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);

  }

  const handleAdd = () => {
    // Logic for deleting a task
    if (todo.trim() === '' || desc.trim() === '') {
      alert("🚫 Task name and description can't be empty!");
      return;
    }

    setTodos([...todos, { id: uuidv4(), todo, desc, isCompleted: false }]);
    setTodo(''); // Clear the input field after adding
    setdesc(''); // Clear the description field after adding
    console.log(todos);

  }

  const handleChange = (e) => {
    // Logic for handling input change
    setTodo(e.target.value);
  }

  const handleChange2 = (e) => {
    // Logic for handling input change
    setdesc(e.target.value);
  }

  const handleCheckboxChange = (e) => {
    // Logic for handling checkbox change
    console.log(e, e.target);
    let id = e.target.name;
    console.log(`The id is ${id}`);
    let index = todos.findIndex(item => {
      return item.id === id
    });

    console.log(`The index is ${index}`);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos);

  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <>
      <Navbar />
      <div className='flex flex-row gap-1 '>


        {/* Adding and Past Tasks bar */}


        <div className='w-1/4 h-screen bg-gray-400 text-black-100 p-3'>
          <div className='text-2xl font-bold mb-4 bg-gray-600 p-2 rounded-lg text-gray-50'>
            Add Tasks
          </div>
          <form className='flex flex-col gap-2'>
            <input
              type='text'
              placeholder='Task Name'
              className='p-2 rounded-lg bg-gray-200 text-gray-900'
              onChange={handleChange} value={todo}
            />
            <textarea
              placeholder='Task Description'
              className='p-2 rounded-lg bg-gray-200 text-gray-900'
              onChange={handleChange2} value={desc}
            ></textarea>
            <button
              onClick={handleAdd}
              type='button'
              className='bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-900 transition-all'
            >
              Add
            </button>

          </form>
          <div className='flex flex-col gap-2 '>
            <button
              onClick={() => setShowPastTasks(!showPastTasks)}
              className='bg-green-600 text-white p-2 font-bold rounded-lg hover:bg-green-700 transition-all mt-2'
            >
              {showPastTasks ? 'Your Tasks' : 'Past Tasks'}
            </button>
          </div>
        </div>


        {/* Your Tasks Start here */}

        <div className='w-3/4 h-screen bg-gray-600 text-gray-50 p-3'>
          <div className='text-2xl font-bold mb-4 bg-gray-400 p-2 rounded-lg text-gray-900'>
            {showPastTasks ? 'Past Tasks' : 'Your Tasks'}
          </div>
          <div className='overflow-y-auto h-[80vh] pr-2 custom-scroll'>
            {filteredTodos.length === 0 && (
              <div className="h-[80%] flex flex-col items-center justify-center">
                {showPastTasks ? (
                  <>
                    <div className="text-gray-300 text-2xl italic opacity-60 bg-gray-700 px-6 py-4 rounded-lg shadow-md m-1">
                      No tasks completed yet 🕐
                    </div>
                    <div className="text-gray-300 text-xl italic opacity-50 bg-gray-700 px-6 py-4 rounded-lg shadow-md m-1">
                      Once you finish a task, it'll show up here ✨
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-gray-300 text-2xl italic opacity-60 bg-gray-700 px-6 py-4 rounded-lg shadow-md m-1">
                      No To-do's Yet 💤
                    </div>
                    <div className="text-gray-300 text-2xl italic opacity-60 bg-gray-700 px-6 py-4 rounded-lg shadow-md m-1">
                      Add some tasks to get started! 📝
                    </div>
                    <div className="text-gray-300 text-2xl italic opacity-60 bg-gray-700 px-6 py-4 rounded-lg shadow-md m-1">
                      Try adding:
                      <ul className="list-disc pl-6 mt-2">
                        <li>✅ Finish React component</li>
                        <li>📚 Read 5 pages of a book</li>
                        <li>🏃‍♂️ Go for a short walk</li>
                      </ul>
                    </div>
                    <div className="text-gray-300 text-2xl italic opacity-60 bg-gray-700 px-6 py-4 rounded-lg shadow-md m-1">
                      “The journey of a thousand miles begins with a single step.” 🌱
                    </div>
                  </>
                )}
              </div>
            )}

            {filteredTodos.map(item => (
              <div key={item.id} className='bg-gray-500 p-3 rounded-lg mb-2 flex justify-between items-center'>

                {/* Left Section: Task Info + Buttons */}
                <div>
                  <h3 className='text-xl font-semibold'>{item.todo}</h3>
                  <p className='text-gray-200'>{item.desc}</p>
                  <div className='gap-2 flex flex-row'>
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-gray-800 text-white p-1 rounded-lg hover:bg-gray-900 transition-all mt-2'>
                      <GrEdit />
                    </button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-red-600 text-white p-1 rounded-lg hover:bg-red-700 transition-all mt-2'
                    >
                      <RiDeleteBinFill />
                    </button>
                  </div>
                </div>

                {/* Right Section: Checkbox */}
                <div className='ml-4 flex items-center'>
                  <label className='flex items-center gap-2 text-sm'>
                    <input
                      type='checkbox'
                      className='form-checkbox h-5 w-5 text-green-500'
                      name={item.id} // Use unique ID for each checkbox
                      onChange={handleCheckboxChange}
                      checked={item.isCompleted}
                      id=''
                    // Optional: Add checked logic or onChange
                    />
                  </label>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </>

  )

}

export default App
