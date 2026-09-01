import cl from "./Items_per_row_UI.module.css"

type Props = {
    value: number;
    setValue: (newValue: number) => void;
}

const Items_per_row_UI = ({value, setValue}: Props) => {

    const handleCLick = (newValue: number) => {
        setValue(Number(newValue));
    }

    // Ограничение для значений
    const Value_Items = [2, 3, 4];

    const icons: Record<number, { active: string; inactive: string }> = {
        2: {
            active: "https://img.icons8.com/?size=100&id=115265&format=png&color=000000",
            inactive: "https://img.icons8.com/?size=100&id=115221&format=png&color=000000",
        },
        3: {
            active: "https://img.icons8.com/?size=100&id=s5aj8IKkzmO5&format=png&color=000000",
            inactive: "https://img.icons8.com/?size=100&id=jLGlCGQS1SFr&format=png&color=000000",
        },
        4: {
            active: "https://img.icons8.com/?size=100&id=11393&format=png&color=000000",
            inactive: "https://img.icons8.com/?size=100&id=11355&format=png&color=000000",
        },
    };

    return(
        <div className={cl["icon-container"]}>
            {Value_Items.map((item) => (
                <button
                    key={item}
                    type="button"
                    className={`${cl.icon_button} ${value === item ? cl.active : ""}`}
                    onClick={() => handleCLick(item)}
                >
                    <img
                        className={cl.grid_img}
                        src={value === item ? icons[item].active : icons[item].inactive}
                        alt={`${item} в ряд`}
                    />
                </button>
            ))}
        </div>
    )
}

export default Items_per_row_UI;
