import React from "react";
import useForm from "react-hook-form";
import { Button, Form, message } from "antd";
// import "./style.css";

const key = "updatable";

const openMessage = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: "Loaded!", key, duration: 2 });
  }, 1000);
};

export default function AddTeacherForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log("submit", data);
  }; // your form submit function which will invoke after successful validation

  // console.log(watch()); // you can watch individual input by pass the name of the input

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Example</label>
      <Form.Item name="example" defaultValue="test" ref={register} />
      <label>ExampleRequired</label>
      <Form.Item
        name="exampleRequired"
        ref={register({ required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && <p>This field is required</p>}
      <label>tiga</label>
      <Form.Item name="tiga" ref={register} />
      <label>empat</label>
      <Form.Item name="empat" ref={register} />

      <input type="submit" onClick={openMessage} />
    </form>
  );
}
