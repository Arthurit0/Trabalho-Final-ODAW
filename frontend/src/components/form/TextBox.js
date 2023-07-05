import { useRef, useEffect } from 'react';
import styles from './TextBox.module.css'

function TextBox({
    text,
    name,
    placeholder,
    handleOnChange,
    value,
    multiple,
}) {
    const textareaRef = useRef(null);

    // Tamanho dinâmico
    const handleInput = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };

    useEffect(() => {
        handleInput();
    }, [value]); // Chama handleInput sempre que o valor muda

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <textarea
                ref={textareaRef}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                onInput={handleInput}
                value={value}
                {...(multiple ? { multiple } : '')}
            />
        </div>
    )
}

export default TextBox
