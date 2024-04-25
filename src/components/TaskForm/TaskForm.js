import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { addTask } from "../../redux/tasksSlice";
import { options } from "../../util/adress";
import css from "./TaskForm.module.css";
import { nanoid } from "@reduxjs/toolkit";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getTaskEmails } from "../../redux/selectors";

export const TaskForm = () => {
  const dispatch = useDispatch();
  const emails = useSelector(getTaskEmails)

  const notify = () =>toast.error('Fill in all fields', {
    position: "top-right",
    autoClose: 700,
    theme: "dark",
    closeOnClick: true,
    transition: Zoom,
    });

    const notifyEmail = () =>toast.error('This person already exists', {
      position: "top-right",
      autoClose: 700,
      theme: "dark",
      closeOnClick: true,
      transition: Zoom,
      });

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const adress = form.elements.adress.value;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const tel = form.elements.tel.value;
    if (adress && name && email && tel) {
console.log(emails.length)
      if(emails.length && emails.includes(email)){
        return notifyEmail()
      }

      const id = nanoid()
      dispatch(addTask({adress,name,email,tel,id}));
      form.reset();
      
    }else{
      notify() 
    }

  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Adress
        <select name="adress" className={css.select} >
          <option value=''>Choose an address</option>
          {options.map((option)=><option key={option.id}>{option.adress}</option>)}
        </select>
      </label>
      <label className={css.label}>
        Name
        <input
          className={css.field}
          type="name"
          name="name"
          placeholder="Enter name..."
        />
      </label>
      <label className={css.label}>
        Email
        <input
          className={css.field}
          type="email"
          name="email"
          placeholder="Enter email..."
        />
      </label>
      <label className={css.label}>
        Telephone
        <input
          className={css.field}
          type="tel"
          name="tel"
          placeholder="Enter telephone..."
        />
      </label>
      <div className={css.container_form_btn}>
        <input type="reset" value='Reset' className={css.btn_reset}/>
        <Button type="submit">Add task</Button>
      </div>
      <ToastContainer/>
    </form>
  );
};
