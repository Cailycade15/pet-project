
type Props = {
    value: number;
    setValue: (newValue: number) => void;
}

const Items_limit_UI = ({value, setValue}: Props) => {
    
    // Ограничение для значений 
    const Value_Items = [9, 12, 18, 24];

    return(
        <div>
            Show: {" "}
            {
            Value_Items.map((item) => (
                <span key={item} 
                        style={{fontWeight: value == item ? " bold" : "normal"}}
                        onClick={() => setValue(Number(item))}
                    > 
                        {item} {item !== Value_Items[Value_Items.length - 1] ? " / " : ""}
                </span>
            ))
            }
        </div>
    )
}

export default Items_limit_UI;