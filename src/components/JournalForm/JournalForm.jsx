import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import cn from "classnames";
import { useContext, useEffect, useReducer, useRef } from "react";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadySubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if(!data){
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
    dispatchForm({ type: "SET_VALUE", payload: { ...data } });
  }, [data, userId]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadySubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: "SET_VALUE", payload: { userId } });
    }
  }, [isFormReadySubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  }, [userId]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      {userId}
      <div className={styles["form-row"]}>
        <Input
          type="text"
          name="title"
          onChange={onChange}
          ref={titleRef}
          value={values.title}
          isValid={isValid.title}
          appearence="title"
        />
        {data?.id && (
          <button
            className={styles["delete"]}
            type="button"
            onClick={deleteJournalItem}
          >
            <img src="/trasher.svg" alt="" />
          </button>
        )}
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/calendar.svg" alt="" width={"15px"} />
          <span>Date</span>
        </label>
        <Input
          type="date"
          onChange={onChange}
          ref={dateRef}
          name="date"
          isValid={isValid.date}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          id="date"
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="/folder.svg" alt="" width={"15px"} />
          <span>Tags</span>
        </label>
        <Input
          type="text"
          onChange={onChange}
          name="tag"
          id="tag"
          value={values.tag}
        />
      </div>
      <textarea
        name="text"
        id=""
        ref={textRef}
        onChange={onChange}
        value={values.text}
        cols={30}
        rows={10}
        className={cn(styles["input-area"], {
          [styles["invalid"]]: !isValid.text,
        })}
      ></textarea>
      <Button>Save</Button>
    </form>
  );
}
export default JournalForm;
