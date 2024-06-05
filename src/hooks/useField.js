import { useState } from "react";
import * as ValidateField from "../Utils/validation/ValidateField"

 const useField  = ({type}) =>{
    const [value, setValue] = useState("");
    const [messageError, setMessageError] = useState("");

    const onblur = event => {
        setValue(event.target.value)
        setMessageError(ValidateField[type](event.target.value)); 
        console.log(value);
    }



    return {
        type,
        value,
        messageError,
        onblur
    }
}

export default useField;