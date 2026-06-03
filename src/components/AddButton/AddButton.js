import { React, useRef } from 'react'
import "./AddButton.css"

export default function AddButton({ setShowModal, showModal }) {
    const addTaskBtn = useRef(null)
    const addHabitBtn = useRef(null)
    const addBtn = useRef(null)
    let toggle = true
    const addBtnToggler = () => {
        // opens and closes the AddBtn at the bottom right and shows the options
        if (toggle) {
            addBtn.current.classList.add("rotate")
            addTaskBtn.current.classList.add("shown")
            addHabitBtn.current.classList.add("shown")
            setTimeout(() => {
                addHabitBtn.current.classList.add("rotate")
            }, 500)
            toggle = !toggle
        } else {
            addHabitBtn.current.classList.add("re-rotate")
            addBtn.current.classList.add("re-rotate")
            addHabitBtn.current.classList.remove("rotate")
            addBtn.current.classList.remove("rotate")
            addHabitBtn.current.classList.remove("re-rotate")
            addBtn.current.classList.remove("re-rotate")
            setTimeout(() => {
                addTaskBtn.current.classList.remove("shown")
                addHabitBtn.current.classList.remove("shown")
            }, 500)
            toggle = !toggle
        }
    }

    return (
            <div className="add-btns-container">
                <div className="btn-toggle">
                    <div className="add-btn" onClick={addBtnToggler}>
                        <svg ref={addBtn} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
                            />
                        </svg>
                    </div>
                    <div
                        className="add-task-btn hidden"
                        ref={addTaskBtn}
                        onClick={() => {
                            // console.log('second')
                            setShowModal("task");
                        }}
                    >
                        <label>Task</label>
                    </div>
                    <div
                        className="add-habit-btn hidden"
                        ref={addHabitBtn}
                        onClick={() => {
                            // console.log('first')
                            setShowModal("habit")
                        }}
                    >

                        <label>Habit</label>
                    </div>
                </div>
            </div>
    )
}
