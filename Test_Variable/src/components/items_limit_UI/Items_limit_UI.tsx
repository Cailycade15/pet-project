import cl from "./Items_limit_UI.module.css"

type Props = {
    value: number;
    setValue: (newValue: number) => void;
}

const Items_limit_UI = ({value, setValue}: Props) => {

    // Ограничение для значений
    const Value_Items = [9, 12, 18, 24];

    return(
        <div className={cl.limit_container}>
            <span className={cl.label}>Показывать:</span>
            {
            Value_Items.map((item) => (
                <span key={item}
                        className={`${cl.limit_option} ${value === item ? cl.active : ""}`}
                        onClick={() => setValue(Number(item))}
                    >
                        {item}
                </span>
            ))
            }
        </div>
    )
}

export default Items_limit_UI;
